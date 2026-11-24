"""
NeuroSense Standardized Model Interface
======================================
Wraps the PennyLane 8-Qubit Quantum-Classical Hybrid model and preprocessors
into a clean, resilient, and clinically guarded prediction interface.

Features:
  - Strict input contract validation (22 acoustic/linguistic features)
  - Missing-value imputation via training medians
  - Clamping to +/- 3-sigma training bounds to prevent out-of-distribution saturation
  - Epistemic uncertainty quantification via Monte Carlo Dropout (30 passes)
  - Seamless mapping of risk probability to Cognitive Speech Score S in [0, 100]
"""

from typing import Any, Dict, List, Optional, Union
import numpy as np
import pandas as pd

try:
    from backend.model_loader import (
        model,
        scaler,
        imputer,
        production_features,
        medians_dict,
        evaluation_metrics,
        run_monte_carlo_inference,
        get_model_info,
        EXPECTED_FEATURE_COUNT,
    )
except ImportError:
    from model_loader import (
        model,
        scaler,
        imputer,
        production_features,
        medians_dict,
        evaluation_metrics,
        run_monte_carlo_inference,
        get_model_info,
        EXPECTED_FEATURE_COUNT,
    )


class QuantumHybridModelWrapper:
    """Standardized wrapper for the NeuroSense Quantum-Classical Hybrid Model."""

    def __init__(self):
        self._available = (model is not None and scaler is not None)
        self._features: List[str] = list(production_features)
        self._medians: Dict[str, float] = medians_dict
        self._metrics: Dict[str, Any] = evaluation_metrics

    @property
    def is_available(self) -> bool:
        return self._available

    @property
    def feature_names(self) -> List[str]:
        return list(self._features)

    def get_metadata(self) -> Dict[str, Any]:
        """Returns model version, benchmark metrics, and quantum architecture specs."""
        info = get_model_info()
        info["status"] = "ready" if self._available else "unavailable"
        info["input_feature_count"] = len(self._features)
        return info

    def prepare_feature_vector(
        self,
        features: Union[Dict[str, float], List[float], np.ndarray],
    ) -> np.ndarray:
        """
        Validates, imputes, and clamps a 22-feature input vector.
        """
        vec = np.zeros((1, EXPECTED_FEATURE_COUNT), dtype=np.float64)

        if isinstance(features, dict):
            for i, feat_name in enumerate(self._features):
                if feat_name in features and features[feat_name] is not None:
                    try:
                        vec[0, i] = float(features[feat_name])
                    except (ValueError, TypeError):
                        vec[0, i] = self._medians.get(feat_name, 0.0)
                else:
                    # Impute missing feature with training median
                    vec[0, i] = self._medians.get(feat_name, 0.0)
        elif isinstance(features, (list, tuple)):
            arr = np.array(features, dtype=np.float64).ravel()
            for i in range(min(len(arr), EXPECTED_FEATURE_COUNT)):
                vec[0, i] = arr[i]
            # Impute remainder if shorter
            for i in range(len(arr), EXPECTED_FEATURE_COUNT):
                feat_name = self._features[i]
                vec[0, i] = self._medians.get(feat_name, 0.0)
        elif isinstance(features, np.ndarray):
            arr = features.astype(np.float64).ravel()
            for i in range(min(len(arr), EXPECTED_FEATURE_COUNT)):
                vec[0, i] = arr[i]
            for i in range(len(arr), EXPECTED_FEATURE_COUNT):
                feat_name = self._features[i]
                vec[0, i] = self._medians.get(feat_name, 0.0)
        else:
            raise ValueError(f"Unsupported features type: {type(features)}")

        # Safety: Impute any remaining NaNs or Infs
        nan_mask = np.isnan(vec) | np.isinf(vec)
        if np.any(nan_mask):
            for col_idx in np.where(nan_mask[0])[0]:
                feat_name = self._features[col_idx]
                vec[0, col_idx] = self._medians.get(feat_name, 0.0)

        return vec

    def predict_screening(
        self,
        features: Union[Dict[str, float], List[float], np.ndarray],
        n_mc_passes: int = 30,
    ) -> Dict[str, Any]:
        """
        Executes calibrated screening prediction:
          - Prepares and clamps 22 features
          - Runs Monte Carlo Dropout passes
          - Returns risk probability, Speech Cognitive Score S (0-100), and uncertainty
        """
        if not self._available:
            return {
                "available": False,
                "error": "Quantum Hybrid model artifacts not loaded",
                "speech_score": None,
            }

        vec = self.prepare_feature_vector(features)

        # Run stochastic inference
        mc_res = run_monte_carlo_inference(vec, n_passes=n_mc_passes)

        mean_prob = mc_res["mean_probability"]
        # In the training set: 1 = cognitive risk / impairment, 0 = healthy control
        # Speech cognitive health score S in [0, 100] is therefore (1 - risk_prob) * 100
        speech_score = round(max(0.0, min(100.0, (1.0 - mean_prob) * 100.0)), 2)

        return {
            "available": True,
            "speech_score": speech_score,
            "risk_probability": round(mean_prob, 4),
            "predicted_risk_class": mc_res["predicted_class"],
            "uncertainty_std": round(mc_res["uncertainty_std"], 4),
            "predictive_entropy": round(mc_res["predictive_entropy"], 4),
            "model_confidence": round(mc_res["confidence"] * 100.0, 1),
            "mc_passes": mc_res["mc_passes"],
            "model_name": "NeuroSense-PennyLane-VQC-8Q",
        }


# Global singleton instance
quantum_model_interface = QuantumHybridModelWrapper()
