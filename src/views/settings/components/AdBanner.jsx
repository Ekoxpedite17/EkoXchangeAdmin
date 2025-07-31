import React, { useState, useRef } from "react";
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
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

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

export default function AdBanner() {
  const [banners, setBanners] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewDialog, setPreviewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [dragActive, setDragActive] = useState(false);
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
    file: null,
  });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      setBannerForm((prev) => ({
        ...prev,
        file: file,
        name: file.name,
      }));
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleSaveBanner = () => {
    if (!bannerForm.file || !bannerForm.name) {
      return;
    }

    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      const newBanner = {
        id: Date.now(),
        ...bannerForm,
        previewUrl: URL.createObjectURL(bannerForm.file),
        createdAt: new Date().toISOString(),
      };

      if (selectedBanner) {
        // Edit existing banner
        setBanners((prev) =>
          prev.map((banner) =>
            banner.id === selectedBanner.id ? newBanner : banner
          )
        );
      } else {
        // Add new banner
        setBanners((prev) => [...prev, newBanner]);
      }

      setBannerForm({
        name: "",
        type: "header",
        position: "top",
        url: "",
        startDate: "",
        endDate: "",
        isActive: true,
        file: null,
      });
      setSelectedBanner(null);
      setEditDialog(false);
      setIsSaving(false);
    }, 1000);
  };

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
      file: null,
    });
    setEditDialog(true);
  };

  const handleDeleteBanner = (bannerId) => {
    setBanners((prev) => prev.filter((banner) => banner.id !== bannerId));
  };

  const handlePreviewBanner = (banner) => {
    setSelectedBanner(banner);
    setPreviewDialog(true);
  };

  const resetForm = () => {
    setBannerForm({
      name: "",
      type: "header",
      position: "top",
      url: "",
      startDate: "",
      endDate: "",
      isActive: true,
      file: null,
    });
    setSelectedBanner(null);
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
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Drag and drop an image file here, or click to select
            </Typography>
            <Button
              variant="contained"
              component="label"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Choose File"}
              <input
                ref={fileInputRef}
                hidden
                accept="image/*"
                type="file"
                onChange={handleFileInput}
              />
            </Button>
          </Box>
        </Paper>

        {/* Banner Form */}
        {bannerForm.file && (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Banner Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Banner Name"
                  value={bannerForm.name}
                  onChange={(e) =>
                    setBannerForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  fullWidth
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
                  placeholder="https://example.com"
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
                />
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
                  label="Active"
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}
                >
                  <Button variant="outlined" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSaveBanner}
                    disabled={isSaving || !bannerForm.name}
                  >
                    {isSaving ? "Saving..." : "Save Banner"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Banner List */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Active Banners ({banners.length})
        </Typography>

        {banners.length === 0 ? (
          <Alert severity="info">
            No banners uploaded yet. Upload your first banner above.
          </Alert>
        ) : (
          <Grid container spacing={2}>
            {banners.map((banner) => (
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
                      <IconButton
                        size="small"
                        onClick={() => handlePreviewBanner(banner)}
                        sx={{ bgcolor: "rgba(255,255,255,0.9)" }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleEditBanner(banner)}
                        sx={{ bgcolor: "rgba(255,255,255,0.9)" }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteBanner(banner.id)}
                        sx={{ bgcolor: "rgba(255,255,255,0.9)" }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    {banner.name}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                    <Chip
                      label={
                        bannerTypes.find((t) => t.value === banner.type)?.label
                      }
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      label={banner.isActive ? "Active" : "Inactive"}
                      size="small"
                      color={banner.isActive ? "success" : "default"}
                    />
                  </Box>
                  <Typography variant="caption" color="textSecondary">
                    Created: {new Date(banner.createdAt).toLocaleDateString()}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Preview Dialog */}
        <Dialog
          open={previewDialog}
          onClose={() => setPreviewDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Banner Preview</DialogTitle>
          <DialogContent>
            {selectedBanner && (
              <Box>
                <img
                  src={selectedBanner.previewUrl}
                  alt={selectedBanner.name}
                  style={{
                    width: "100%",
                    maxHeight: 400,
                    objectFit: "contain",
                  }}
                />
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6">{selectedBanner.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Type:{" "}
                    {
                      bannerTypes.find((t) => t.value === selectedBanner.type)
                        ?.label
                    }
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Position:{" "}
                    {
                      bannerPositions.find(
                        (p) => p.value === selectedBanner.position
                      )?.label
                    }
                  </Typography>
                  {selectedBanner.url && (
                    <Typography variant="body2" color="textSecondary">
                      URL: {selectedBanner.url}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPreviewDialog(false)}>Close</Button>
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
                />
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
                  label="Active"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSaveBanner}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}
