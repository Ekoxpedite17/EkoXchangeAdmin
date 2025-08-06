import React, { useState, useRef } from "react";

// Define banner types and positions
const bannerTypes = [
  { value: "header", label: "Header Banner" },
  { value: "sidebar", label: "Sidebar Banner" },
  { value: "popup", label: "Popup Banner" },
  { value: "footer", label: "Footer Banner" },
];

const bannerPositions = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
  { value: "center", label: "Center" },
];

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Chip,
  Alert,
  Snackbar,
  Tooltip,
  CircularProgress,
  FormHelperText,
  Divider,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  PhoneIphone as PhoneIphoneIcon,
  PhoneAndroid as PhoneAndroidIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Link as LinkIcon,
  Schedule as ScheduleIcon,
  Publish as PublishIcon,
  Save as SaveIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";

// Utility function to validate URLs
const isValidUrl = (url) => {
  if (!url) return false;
  try {
    // Check if it's an internal path
    if (url.startsWith("/")) return true;

    // Check if it's a valid external URL
    new URL(url);
    return url.startsWith("https://");
  } catch (e) {
    return false;
  }
};

// Utility function to resize image
const resizeImage = (file, maxWidth, maxHeight) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        // Create canvas and resize
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob
        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, { type: file.type }));
        }, file.type);
      };
    };
  });
};

export default function AdBanner() {
  // State variables
  const [banners, setBanners] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewDialog, setPreviewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [previewDevice, setPreviewDevice] = useState("ios");
  const [publishMode, setPublishMode] = useState("draft");
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // Form state for new/edit banner
  const [bannerForm, setBannerForm] = useState({
    name: "",
    type: "header",
    position: "top",
    url: "",
    startDate: "",
    endDate: "",
    isActive: true,
    priority: 5, // Default priority (1 = highest, 10 = lowest)
    file: null,
    originalFile: null,
    resizedFile: null,
    status: "draft", // draft or published
  });

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Validate file type and size
  const validateFile = (file) => {
    // Check file type
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setSnackbar({
        open: true,
        message:
          "Invalid file type. Please upload PNG, JPG, or WebP images only.",
        severity: "error",
      });
      return false;
    }

    // Check file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setSnackbar({
        open: true,
        message: "File size exceeds 5MB limit. Please upload a smaller image.",
        severity: "error",
      });
      return false;
    }

    return true;
  };

  // Handle file selection
  const handleFileSelect = async (file) => {
    if (!file) return;

    if (!validateFile(file)) return;

    setIsUploading(true);

    try {
      // Resize image to fit mobile dimensions (1080x360)
      const resizedFile = await resizeImage(file, 1080, 360);

      setBannerForm((prev) => ({
        ...prev,
        file: file,
        originalFile: file,
        resizedFile: resizedFile,
        name: file.name.split(".")[0], // Use filename as default banner name
      }));

      setSnackbar({
        open: true,
        message: "Image uploaded and resized successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error processing image. Please try again.",
        severity: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Handle file input change
  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  // Validate form before saving
  const validateForm = () => {
    const newErrors = {};

    if (!bannerForm.name.trim()) {
      newErrors.name = "Banner name is required";
    }

    if (!bannerForm.file && !selectedBanner) {
      newErrors.file = "Please upload an image";
    }

    if (bannerForm.url && !isValidUrl(bannerForm.url)) {
      newErrors.url =
        "Please enter a valid URL (must start with https:// or /)";
    }

    if (bannerForm.startDate && bannerForm.endDate) {
      const start = new Date(bannerForm.startDate);
      const end = new Date(bannerForm.endDate);

      if (end <= start) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save/publish banner
  const handleSaveBanner = (publishStatus = "draft") => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    // Simulate API call to backend
    setTimeout(() => {
      const newBanner = {
        id: selectedBanner?.id || Date.now(),
        ...bannerForm,
        status: publishStatus,
        previewUrl: URL.createObjectURL(
          bannerForm.resizedFile || bannerForm.file
        ),
        createdAt: selectedBanner?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (selectedBanner) {
        // Edit existing banner
        setBanners((prev) =>
          prev.map((banner) =>
            banner.id === selectedBanner.id ? newBanner : banner
          )
        );
        setSnackbar({
          open: true,
          message:
            publishStatus === "published"
              ? "Banner published successfully!"
              : "Banner saved as draft.",
          severity: "success",
        });
      } else {
        // Add new banner
        setBanners((prev) => [...prev, newBanner]);
        setSnackbar({
          open: true,
          message:
            publishStatus === "published"
              ? "New banner published successfully!"
              : "New banner saved as draft.",
          severity: "success",
        });
      }

      resetForm();
      setEditDialog(false);
      setIsSaving(false);
    }, 1000);
  };

  // Handle edit banner
  const handleEditBanner = (banner) => {
    setSelectedBanner(banner);
    setBannerForm({
      name: banner.name,
      type: banner.type,
      position: banner.position,
      url: banner.url,
      startDate: banner.startDate,
      endDate: banner.endDate,
      isActive: banner.isActive,
      priority: banner.priority || 5,
      file: null,
      originalFile: null,
      resizedFile: null,
      status: banner.status || "draft",
    });
    setEditDialog(true);
  };

  // Handle delete banner
  const handleDeleteBanner = (bannerId) => {
    setBanners((prev) => prev.filter((banner) => banner.id !== bannerId));
    setSnackbar({
      open: true,
      message: "Banner deleted successfully.",
      severity: "success",
    });
  };

  // Handle preview banner
  const handlePreviewBanner = (banner) => {
    setSelectedBanner(banner);
    setPreviewDialog(true);
  };

  // Handle toggle banner status
  const handleToggleStatus = (bannerId, newStatus) => {
    setBanners((prev) =>
      prev.map((banner) =>
        banner.id === bannerId ? { ...banner, isActive: newStatus } : banner
      )
    );

    setSnackbar({
      open: true,
      message: `Banner ${newStatus ? "activated" : "deactivated"} successfully.`,
      severity: "success",
    });
  };

  // Handle priority change
  const handlePriorityChange = (bannerId, newPriority) => {
    setBanners((prev) =>
      prev.map((banner) =>
        banner.id === bannerId ? { ...banner, priority: newPriority } : banner
      )
    );
  };

  // Reset form
  const resetForm = () => {
    setBannerForm({
      name: "",
      type: "header",
      position: "top",
      url: "",
      startDate: "",
      endDate: "",
      isActive: true,
      priority: 5,
      file: null,
      originalFile: null,
      resizedFile: null,
      status: "draft",
    });
    setSelectedBanner(null);
    setErrors({});
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Sort banners by priority
  const sortedBanners = [...banners].sort((a, b) => {
    // First by priority (lower number = higher priority)
    if ((a.priority || 5) !== (b.priority || 5)) {
      return (a.priority || 5) - (b.priority || 5);
    }
    // Then by creation date if priorities are equal
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // Get banner status text and color
  const getBannerStatus = (banner) => {
    const now = new Date();
    const startDate = banner.startDate ? new Date(banner.startDate) : null;
    const endDate = banner.endDate ? new Date(banner.endDate) : null;

    if (!banner.isActive) {
      return { text: "Inactive", color: "default" };
    }

    if (banner.status === "draft") {
      return { text: "Draft", color: "warning" };
    }

    if (startDate && now < startDate) {
      return { text: "Scheduled", color: "info" };
    }

    if (endDate && now > endDate) {
      return { text: "Expired", color: "error" };
    }

    return { text: "Active", color: "success" };
  };

  return (
    <Card sx={{ bgcolor: "white", boxShadow: "none", borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Ad Banner Management
        </Typography>

        {/* Upload Section */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            border: dragActive ? "2px dashed #1976d2" : "2px dashed #e0e0e0",
            backgroundColor: dragActive ? "#f3f8ff" : "#fafafa",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Box sx={{ textAlign: "center" }}>
            <CloudUploadIcon sx={{ fontSize: 48, color: "#666", mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              Upload Ad Banner
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Drag and drop an image file here, or click to select
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ mb: 2, display: "block" }}
            >
              Accepted formats: PNG, JPG, WebP • Max size: 5MB • Recommended
              size: 1080×360px
            </Typography>
            <Button
              variant="contained"
              component="label"
              disabled={isUploading}
              startIcon={
                isUploading ? (
                  <CircularProgress size={20} />
                ) : (
                  <CloudUploadIcon />
                )
              }
            >
              {isUploading ? "Processing..." : "Choose File"}
              <input
                ref={fileInputRef}
                hidden
                accept="image/png,image/jpeg,image/jpg,image/webp"
                type="file"
                onChange={handleFileInput}
              />
            </Button>
          </Box>
        </Paper>

        {/* Banner Form */}
        {bannerForm.file && (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Banner Details</Typography>
              <ToggleButtonGroup
                value={publishMode}
                exclusive
                onChange={(e, newValue) => newValue && setPublishMode(newValue)}
                size="small"
              >
                <ToggleButton value="draft">
                  <SaveIcon fontSize="small" sx={{ mr: 0.5 }} />
                  Draft
                </ToggleButton>
                <ToggleButton value="publish">
                  <PublishIcon fontSize="small" sx={{ mr: 0.5 }} />
                  Publish
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Grid container spacing={2}>
              {/* Banner Preview */}
              <Grid item xs={12}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 1,
                    mb: 2,
                    display: "flex",
                    justifyContent: "center",
                    bgcolor: "#f5f5f5",
                  }}
                >
                  <Box
                    sx={{ position: "relative", width: "100%", maxWidth: 500 }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        position: "absolute",
                        top: -20,
                        left: 0,
                        color: "text.secondary",
                      }}
                    >
                      Preview (Mobile App)
                    </Typography>
                    <img
                      src={
                        bannerForm.file
                          ? URL.createObjectURL(bannerForm.file)
                          : ""
                      }
                      alt="Banner Preview"
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: 167,
                        objectFit: "contain",
                        borderRadius: 8,
                      }}
                    />
                  </Box>
                </Paper>
              </Grid>

              {/* Banner Name */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Banner Name"
                  value={bannerForm.name}
                  onChange={(e) =>
                    setBannerForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  fullWidth
                  required
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>

              {/* Banner Type */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Banner Type</InputLabel>
                  <Select
                    value={bannerForm.type}
                    label="Banner Type"
                    onChange={(e) =>
                      setBannerForm((prev) => ({
                        ...prev,
                        type: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value="header">Header Banner</MenuItem>
                    <MenuItem value="sidebar">Sidebar Banner</MenuItem>
                    <MenuItem value="popup">Popup Banner</MenuItem>
                    <MenuItem value="footer">Footer Banner</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Target URL */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Target URL (CTA)"
                  value={bannerForm.url}
                  onChange={(e) =>
                    setBannerForm((prev) => ({ ...prev, url: e.target.value }))
                  }
                  fullWidth
                  placeholder="https://example.com or /internal-route"
                  InputProps={{
                    startAdornment: <LinkIcon color="action" sx={{ mr: 1 }} />,
                  }}
                  error={!!errors.url}
                  helperText={
                    errors.url ||
                    "Enter a valid URL starting with https:// or / for internal routes"
                  }
                />
              </Grid>

              {/* Priority */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Display Priority</InputLabel>
                  <Select
                    value={bannerForm.priority}
                    label="Display Priority"
                    onChange={(e) =>
                      setBannerForm((prev) => ({
                        ...prev,
                        priority: e.target.value,
                      }))
                    }
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num === 1
                          ? "1 (Highest)"
                          : num === 10
                            ? "10 (Lowest)"
                            : num.toString()}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    Lower numbers display first in the app
                  </FormHelperText>
                </FormControl>
              </Grid>

              {/* Start Date */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Start Date & Time"
                  type="datetime-local"
                  value={bannerForm.startDate}
                  onChange={(e) =>
                    setBannerForm((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <ScheduleIcon color="action" sx={{ mr: 1 }} />
                    ),
                  }}
                />
              </Grid>

              {/* End Date */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="End Date & Time"
                  type="datetime-local"
                  value={bannerForm.endDate}
                  onChange={(e) =>
                    setBannerForm((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <ScheduleIcon color="action" sx={{ mr: 1 }} />
                    ),
                  }}
                  error={!!errors.endDate}
                  helperText={errors.endDate || "Leave empty for no end date"}
                />
              </Grid>

              {/* Active Status */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={bannerForm.isActive}
                      onChange={(e) =>
                        setBannerForm((prev) => ({
                          ...prev,
                          isActive: e.target.checked,
                        }))
                      }
                    />
                  }
                  label={
                    bannerForm.isActive
                      ? "Active (Visible in app)"
                      : "Inactive (Hidden from app)"
                  }
                />
              </Grid>

              {/* Action Buttons */}
              <Grid item xs={12}>
                <Box
                  sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}
                >
                  <Button variant="outlined" onClick={resetForm}>
                    Cancel
                  </Button>
                  {publishMode === "draft" ? (
                    <Button
                      variant="contained"
                      onClick={() => handleSaveBanner("draft")}
                      disabled={isSaving}
                      startIcon={
                        isSaving ? <CircularProgress size={20} /> : <SaveIcon />
                      }
                    >
                      {isSaving ? "Saving..." : "Save as Draft"}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSaveBanner("published")}
                      disabled={isSaving}
                      startIcon={
                        isSaving ? (
                          <CircularProgress size={20} />
                        ) : (
                          <PublishIcon />
                        )
                      }
                    >
                      {isSaving ? "Publishing..." : "Publish Banner"}
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Banner List */}
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Banners ({banners.length})</Typography>
          {banners.length > 0 && (
            <Typography variant="caption" color="textSecondary">
              Displaying in priority order (as shown in app)
            </Typography>
          )}
        </Box>

        {banners.length === 0 ? (
          <Alert severity="info">
            No banners uploaded yet. Upload your first banner above.
          </Alert>
        ) : (
          <Grid container spacing={2}>
            {sortedBanners.map((banner) => {
              const status = getBannerStatus(banner);
              return (
                <Grid item xs={12} md={6} lg={4} key={banner.id}>
                  <Paper sx={{ p: 2, position: "relative" }}>
                    <Box sx={{ position: "relative", mb: 2 }}>
                      <img
                        src={banner.previewUrl}
                        alt={banner.name}
                        style={{
                          width: "100%",
                          height: 150,
                          objectFit: "cover",
                          borderRadius: 8,
                          opacity: banner.isActive ? 1 : 0.5,
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        <Tooltip title="Preview">
                          <IconButton
                            size="small"
                            onClick={() => handlePreviewBanner(banner)}
                            sx={{ bgcolor: "rgba(255,255,255,0.9)" }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => handleEditBanner(banner)}
                            sx={{ bgcolor: "rgba(255,255,255,0.9)" }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteBanner(banner.id)}
                            sx={{ bgcolor: "rgba(255,255,255,0.9)" }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      {/* Priority indicator */}
                      <Chip
                        label={`Priority: ${banner.priority || 5}`}
                        size="small"
                        sx={{
                          position: "absolute",
                          bottom: 8,
                          left: 8,
                          bgcolor: "rgba(0,0,0,0.6)",
                          color: "white",
                          fontSize: "0.7rem",
                        }}
                      />
                    </Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      {banner.name}
                    </Typography>
                    <Box
                      sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}
                    >
                      <Chip
                        label={
                          banner.type.charAt(0).toUpperCase() +
                          banner.type.slice(1)
                        }
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        label={status.text}
                        size="small"
                        color={status.color}
                      />
                    </Box>

                    {/* Banner details */}
                    <Box
                      sx={{
                        mt: 2,
                        fontSize: "0.8rem",
                        color: "text.secondary",
                      }}
                    >
                      {banner.url && (
                        <Typography
                          variant="caption"
                          display="block"
                          sx={{ mb: 0.5 }}
                        >
                          <LinkIcon
                            fontSize="inherit"
                            sx={{ verticalAlign: "middle", mr: 0.5 }}
                          />
                          {banner.url.length > 30
                            ? banner.url.substring(0, 30) + "..."
                            : banner.url}
                        </Typography>
                      )}

                      {banner.startDate && (
                        <Typography
                          variant="caption"
                          display="block"
                          sx={{ mb: 0.5 }}
                        >
                          <ScheduleIcon
                            fontSize="inherit"
                            sx={{ verticalAlign: "middle", mr: 0.5 }}
                          />
                          From: {new Date(banner.startDate).toLocaleString()}
                        </Typography>
                      )}

                      {banner.endDate && (
                        <Typography
                          variant="caption"
                          display="block"
                          sx={{ mb: 0.5 }}
                        >
                          <ScheduleIcon
                            fontSize="inherit"
                            sx={{ verticalAlign: "middle", mr: 0.5 }}
                          />
                          Until: {new Date(banner.endDate).toLocaleString()}
                        </Typography>
                      )}
                    </Box>

                    {/* Action buttons */}
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Tooltip title="Move up in priority">
                          <IconButton
                            size="small"
                            onClick={() =>
                              handlePriorityChange(
                                banner.id,
                                Math.max(1, (banner.priority || 5) - 1)
                              )
                            }
                            disabled={(banner.priority || 5) <= 1}
                          >
                            <ArrowUpwardIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Move down in priority">
                          <IconButton
                            size="small"
                            onClick={() =>
                              handlePriorityChange(
                                banner.id,
                                Math.min(10, (banner.priority || 5) + 1)
                              )
                            }
                            disabled={(banner.priority || 5) >= 10}
                          >
                            <ArrowDownwardIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <FormControlLabel
                        control={
                          <Switch
                            size="small"
                            checked={banner.isActive}
                            onChange={(e) =>
                              handleToggleStatus(banner.id, e.target.checked)
                            }
                          />
                        }
                        label={banner.isActive ? "Active" : "Inactive"}
                        sx={{ ml: 0 }}
                      />
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* Preview Dialog */}
        <Dialog
          open={previewDialog}
          onClose={() => setPreviewDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Banner Preview</Typography>
              <ToggleButtonGroup
                value={previewDevice}
                exclusive
                onChange={(e, newValue) =>
                  newValue && setPreviewDevice(newValue)
                }
                size="small"
              >
                <ToggleButton value="ios">
                  <PhoneIphoneIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton value="android">
                  <PhoneAndroidIcon fontSize="small" />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </DialogTitle>
          <DialogContent>
            {selectedBanner && (
              <Box>
                <Box
                  sx={{
                    border: "10px solid #333",
                    borderRadius: previewDevice === "ios" ? "20px" : "10px",
                    overflow: "hidden",
                    width: "100%",
                    maxWidth: 350,
                    mx: "auto",
                    mb: 2,
                    position: "relative",
                    pb: "50%",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      bgcolor: "#f5f5f5",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        height: "20px",
                        bgcolor: previewDevice === "ios" ? "#f5f5f5" : "#333",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {previewDevice === "ios" && (
                        <Box
                          sx={{
                            width: "40%",
                            height: "15px",
                            bgcolor: "#333",
                            borderBottomLeftRadius: "10px",
                            borderBottomRightRadius: "10px",
                          }}
                        />
                      )}
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "30%",
                          bgcolor: "#fff",
                          p: 1,
                        }}
                      >
                        <img
                          src={selectedBanner.previewUrl}
                          alt={selectedBanner.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 4,
                          }}
                        />
                      </Box>
                      <Box sx={{ flex: 1, bgcolor: "#fff", p: 1 }}>
                        <Box
                          sx={{
                            width: "70%",
                            height: "10px",
                            bgcolor: "#ddd",
                            mb: 1,
                            borderRadius: "5px",
                          }}
                        />
                        <Box
                          sx={{
                            width: "90%",
                            height: "10px",
                            bgcolor: "#eee",
                            mb: 1,
                            borderRadius: "5px",
                          }}
                        />
                        <Box
                          sx={{
                            width: "60%",
                            height: "10px",
                            bgcolor: "#eee",
                            mb: 1,
                            borderRadius: "5px",
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6">{selectedBanner.name}</Typography>

                <Stack spacing={1} sx={{ mt: 2 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="textSecondary">
                      Type:
                    </Typography>
                    <Typography variant="body2">
                      {selectedBanner.type.charAt(0).toUpperCase() +
                        selectedBanner.type.slice(1)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="textSecondary">
                      Position:
                    </Typography>
                    <Typography variant="body2">
                      {selectedBanner.position.charAt(0).toUpperCase() +
                        selectedBanner.position.slice(1)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="textSecondary">
                      Priority:
                    </Typography>
                    <Typography variant="body2">
                      {selectedBanner.priority || 5}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="textSecondary">
                      Status:
                    </Typography>
                    <Chip
                      label={getBannerStatus(selectedBanner).text}
                      size="small"
                      color={getBannerStatus(selectedBanner).color}
                    />
                  </Box>

                  {selectedBanner.url && (
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        URL:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ maxWidth: "70%", wordBreak: "break-all" }}
                      >
                        {selectedBanner.url}
                      </Typography>
                    </Box>
                  )}

                  {selectedBanner.startDate && (
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        Start Date:
                      </Typography>
                      <Typography variant="body2">
                        {new Date(selectedBanner.startDate).toLocaleString()}
                      </Typography>
                    </Box>
                  )}

                  {selectedBanner.endDate && (
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        End Date:
                      </Typography>
                      <Typography variant="body2">
                        {new Date(selectedBanner.endDate).toLocaleString()}
                      </Typography>
                    </Box>
                  )}
                </Stack>

                {selectedBanner.url && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="caption">
                      {selectedBanner.url.startsWith("/")
                        ? "This banner will navigate to an internal app screen."
                        : "This banner will open in the in-app browser."}
                    </Typography>
                  </Alert>
                )}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPreviewDialog(false)}>Close</Button>
            {selectedBanner && (
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => {
                  setPreviewDialog(false);
                  handleEditBanner(selectedBanner);
                }}
              >
                Edit Banner
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog
          open={editDialog}
          onClose={() => setEditDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Edit Banner</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Banner Name"
                  value={bannerForm.name}
                  onChange={(e) =>
                    setBannerForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Banner Type</InputLabel>
                  <Select
                    value={bannerForm.type}
                    label="Banner Type"
                    onChange={(e) =>
                      setBannerForm((prev) => ({
                        ...prev,
                        type: e.target.value,
                      }))
                    }
                  >
                    {bannerTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Position</InputLabel>
                  <Select
                    value={bannerForm.position}
                    label="Position"
                    onChange={(e) =>
                      setBannerForm((prev) => ({
                        ...prev,
                        position: e.target.value,
                      }))
                    }
                  >
                    {bannerPositions.map((pos) => (
                      <MenuItem key={pos.value} value={pos.value}>
                        {pos.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Target URL"
                  value={bannerForm.url}
                  onChange={(e) =>
                    setBannerForm((prev) => ({ ...prev, url: e.target.value }))
                  }
                  fullWidth
                  error={!!errors.url}
                  helperText={
                    errors.url ||
                    "Enter a valid URL starting with https:// or / for internal routes"
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Start Date"
                  type="datetime-local"
                  value={bannerForm.startDate}
                  onChange={(e) =>
                    setBannerForm((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="End Date"
                  type="datetime-local"
                  value={bannerForm.endDate}
                  onChange={(e) =>
                    setBannerForm((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.endDate}
                  helperText={errors.endDate}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={bannerForm.priority}
                    label="Priority"
                    onChange={(e) =>
                      setBannerForm((prev) => ({
                        ...prev,
                        priority: e.target.value,
                      }))
                    }
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num === 1
                          ? "1 (Highest)"
                          : num === 10
                            ? "10 (Lowest)"
                            : num.toString()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={bannerForm.isActive}
                      onChange={(e) =>
                        setBannerForm((prev) => ({
                          ...prev,
                          isActive: e.target.checked,
                        }))
                      }
                    />
                  }
                  label={bannerForm.isActive ? "Active" : "Inactive"}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button variant="outlined" color="primary" component="label">
                    Replace Image
                    <input
                      hidden
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      type="file"
                      onChange={handleFileInput}
                    />
                  </Button>
                  <Box>
                    <Button onClick={() => setEditDialog(false)} sx={{ mr: 1 }}>
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleSaveBanner(bannerForm.status)}
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
}
