import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Checkbox,
  Typography,
} from "@mui/material";

const EditFeeStandalone = ({
  transactionTypes = [],
  assets = [],
  feeTypes = [],
  userLevels = [],
  initialData = null,
  onSave, // Callback when the fee is saved
}) => {
  // Define an initial fee state using assetId and networkId keys
  const initialFeeState = {
    transactionType: "",
    assetId: "",
    networkId: "",
    feeType: "",
    feeValue: "",
    appliedTo: [],
    effectiveFrom: "",
  };

  const [fee, setFee] = useState(initialFeeState);
  const [errors, setErrors] = useState({});

  // If initialData is provided, initialize the state from it
  useEffect(() => {
    if (initialData) {
      setFee({
        transactionType: initialData.transactionType || "",
        assetId: initialData.cryptoAsset?.chain?._id || "",
        networkId: initialData.cryptoAsset?._id || "",
        feeType: initialData.isPercentage ? "Percentage" : "Fixed",
        feeValue: initialData.isPercentage
          ? initialData.percentageAmount?.toString() || ""
          : initialData.fixedAmount?.toString() || "",
        appliedTo: initialData.userLevel ? [initialData.userLevel] : [],
        effectiveFrom: initialData.effectiveDate
          ? new Date(initialData.effectiveDate).toISOString().slice(0, 16)
          : "",
      });
    } else {
      setFee(initialFeeState);
    }
  }, [initialData]);

  const handleChange = (key, value) => {
    setFee((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  // Validation function that checks all required fields
  const validate = () => {
    let tempErrors = {};
    const requiredFields = [
      "transactionType",
      "assetId",
      "networkId",
      "feeType",
      "feeValue",
      "appliedTo",
    ];

    requiredFields.forEach((field) => {
      if (field === "appliedTo") {
        if (!fee.appliedTo || fee.appliedTo.length === 0) {
          tempErrors.appliedTo = "At least one user level must be selected";
        }
      } else if (field === "feeValue") {
        if (!fee[field] || fee[field] === "" || fee[field] === "0") {
          tempErrors[field] =
            "Fee value is required and must be greater than 0";
        } else if (parseFloat(fee[field]) <= 0) {
          tempErrors[field] = "Fee value must be greater than 0";
        } else if (
          fee.feeType === "Percentage" &&
          parseFloat(fee[field]) > 100
        ) {
          tempErrors[field] = "Percentage cannot exceed 100%";
        }
      } else {
        if (!fee[field] || fee[field] === "") {
          tempErrors[field] = "This field is required";
        }
      }
    });

    return tempErrors;
  };

  // Enrich fee with full asset and network objects (if available)
  const handleSave = () => {
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const assetObj = assets.find((a) => a._id === fee.assetId);
    const networkObj = assetObj?.tokens?.find((t) => t._id === fee.networkId);

    const enrichedFee = {
      ...fee,
      feeValue: parseFloat(fee.feeValue),
      asset: assetObj || null,
      network: networkObj || null,
    };

    onSave && onSave(enrichedFee);
  };

  // Get available networks for the currently selected asset
  const availableNetworks =
    assets.find((a) => a._id === fee.assetId)?.tokens || [];

  return (
    <Box
      sx={{
        p: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Edit Fee
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {/* Transaction Type */}
        <FormControl
          fullWidth
          size="small"
          error={Boolean(errors.transactionType)}
        >
          <InputLabel>Transaction Type</InputLabel>
          <Select
            label="Transaction Type"
            value={fee.transactionType || ""}
            onChange={(e) => handleChange("transactionType", e.target.value)}
          >
            {transactionTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
          {errors.transactionType && (
            <FormHelperText>{errors.transactionType}</FormHelperText>
          )}
        </FormControl>

        {/* Crypto Asset */}
        <FormControl fullWidth size="small" error={Boolean(errors.assetId)}>
          <InputLabel>Crypto Asset</InputLabel>
          <Select
            label="Crypto Asset"
            value={fee.assetId || ""}
            onChange={(e) => {
              handleChange("assetId", e.target.value);
              handleChange("networkId", ""); // reset network when asset changes
            }}
            renderValue={(selected) => {
              const selectedAsset = assets.find((a) => a._id === selected);
              return selectedAsset ? selectedAsset.name : "";
            }}
          >
            {assets.map((asset) => (
              <MenuItem key={asset._id} value={asset._id}>
                {asset.name} ({asset.nativeToken})
              </MenuItem>
            ))}
          </Select>
          {errors.assetId && <FormHelperText>{errors.assetId}</FormHelperText>}
        </FormControl>

        {/* Network */}
        <FormControl
          fullWidth
          size="small"
          error={Boolean(errors.networkId)}
          disabled={!fee.assetId}
        >
          <InputLabel>Network</InputLabel>
          <Select
            label="Network"
            value={fee.networkId || ""}
            onChange={(e) => handleChange("networkId", e.target.value)}
            renderValue={(selected) => {
              const selectedNetwork = availableNetworks.find(
                (t) => t._id === selected
              );
              return selectedNetwork
                ? `${selectedNetwork.name} (${selectedNetwork.symbol})`
                : "";
            }}
          >
            {availableNetworks.map((token) => (
              <MenuItem key={token._id} value={token._id}>
                {token.name} ({token.symbol})
              </MenuItem>
            ))}
          </Select>
          {errors.networkId && (
            <FormHelperText>{errors.networkId}</FormHelperText>
          )}
          {!fee.assetId && (
            <FormHelperText>Please select a crypto asset first</FormHelperText>
          )}
        </FormControl>

        {/* Fee Type */}
        <FormControl component="fieldset" error={Boolean(errors.feeType)}>
          <RadioGroup
            row
            value={fee.feeType || ""}
            onChange={(e) => handleChange("feeType", e.target.value)}
          >
            {feeTypes.map((type) => (
              <FormControlLabel
                key={type}
                value={type}
                control={<Radio />}
                label={type}
              />
            ))}
          </RadioGroup>
          {errors.feeType && <FormHelperText>{errors.feeType}</FormHelperText>}
        </FormControl>

        {/* Fee Value */}
        <TextField
          label={
            fee.feeType === "Fixed"
              ? "Fee Value (NGN)"
              : fee.feeType === "Percentage"
                ? "Fee Value (%)"
                : "Fee Value"
          }
          type="number"
          value={fee.feeValue || ""}
          fullWidth
          size="small"
          error={Boolean(errors.feeValue)}
          helperText={errors.feeValue}
          onChange={(e) => handleChange("feeValue", e.target.value)}
          inputProps={{
            min: "0",
            step: fee.feeType === "Percentage" ? "0.01" : "0.1",
            max: fee.feeType === "Percentage" ? "100" : undefined,
          }}
        />

        {/* Applied To (User Level) */}
        <FormControl fullWidth size="small" error={Boolean(errors.appliedTo)}>
          <InputLabel>Applied To (User Level)</InputLabel>
          <Select
            multiple
            value={fee.appliedTo || []}
            onChange={(e) => {
              const value =
                typeof e.target.value === "string"
                  ? e.target.value.split(",")
                  : e.target.value;
              handleChange("appliedTo", value);
            }}
            renderValue={(selected) =>
              Array.isArray(selected) ? selected.join(", ") : ""
            }
          >
            {userLevels.map((level) => (
              <MenuItem key={level} value={level}>
                <Checkbox
                  checked={
                    Array.isArray(fee.appliedTo) &&
                    fee.appliedTo.includes(level)
                  }
                />
                {level}
              </MenuItem>
            ))}
          </Select>
          {errors.appliedTo && (
            <FormHelperText>{errors.appliedTo}</FormHelperText>
          )}
        </FormControl>

        {/* Effective From (optional) */}
        <TextField
          label="Effective From (optional)"
          type="datetime-local"
          fullWidth
          size="small"
          InputLabelProps={{ shrink: true }}
          value={fee.effectiveFrom || ""}
          onChange={(e) => handleChange("effectiveFrom", e.target.value)}
        />

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditFeeStandalone;
