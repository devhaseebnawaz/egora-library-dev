import React, { useState, useCallback } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { GoogleMap, Marker, useJsApiLoader, Polygon } from "@react-google-maps/api";
import { getScreenSizeCategory } from '../../../utils/fontsize';
const containerStyle = {
    width: "100%",
    height: "100%",
};

const defaultCenter = {
    lat: 31.4715,
    lng: 74.4086,
};


export default function AddAddressModal({ states, actions, layout, globalComponentStyles, themeColors, open, onClose }) {

    const [position, setPosition] = useState(defaultCenter);
    const [isInsidePolygon, setIsInsidePolygon] = useState(true);
    const mapRef = React.useRef(null);

    const handleCurrentLocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const { latitude, longitude } = pos.coords;
                setPosition({ lat: latitude, lng: longitude });
                getAddressFromLatLng(latitude, longitude, states?.setAddressRegion);
            });
        }
    }, []);

    const getAddressFromLatLng = async (lat, lng, setAddressRegion) => {
        if (!window.google || !window.google.maps) return;

        const geocoder = new window.google.maps.Geocoder();
        const latlng = { lat, lng };

        geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK" && results[0]) {
                const components = results[0].address_components;
                const streetNumber = components.find(c => c.types.includes("street_number"))?.long_name || "";
                const route = components.find(c => c.types.includes("route"))?.long_name || "";
                const sublocality = components.find(c => c.types.includes("sublocality"))?.long_name || "";
                const cleanedAddress = [streetNumber, route, sublocality]
                    .filter(Boolean)
                    .join(", ");
                setAddressRegion(cleanedAddress);
            } else {
                console.error("Geocoder failed due to:", status);
            }
        });
    };

    const handleChangeInput = (value) => {
        states?.setAddressRegion(value)
        actions?.handleDisplayRegion(true)
    }

    const getPlaceOrderButtonStyles = {
        color:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextColor
                ?.value !== ''
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextColor?.value}`
                : globalComponentStyles?.Text?.color?.value != ''
                    ? globalComponentStyles?.Text?.color?.value
                    : `${themeColors?.CartCheckoutSummaryPlaceOrderTextColor?.value}`,
        fontSize:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextSize
                ?.value[getScreenSizeCategory()] != 0
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextSize
                    ?.value[getScreenSizeCategory()]
                : globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()] != 0
                    ? globalComponentStyles?.Text?.size?.value[getScreenSizeCategory()]
                    : themeColors?.CartCheckoutSummaryPlaceOrderTextSize?.value[getScreenSizeCategory()],
        fontWeight:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextWeight
                ?.value != ''
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextWeight
                    ?.value
                : globalComponentStyles?.Text?.fontWeight?.value != ''
                    ? globalComponentStyles?.Text?.fontWeight?.value
                    : themeColors?.CartCheckoutSummaryPlaceOrderTextWeight?.value,

        fontFamily:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextFont
                ?.value != ''
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextFont?.value}`
                : globalComponentStyles?.Text?.fontFamily?.value != ''
                    ? globalComponentStyles?.Text?.fontFamily?.value
                    : `${themeColors?.CartCheckoutSummaryPlaceOrderTextFont?.value}`,

        fontStyle:
            layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextStyle
                ?.value !== ''
                ? `${layout?.cartCheckoutSummaryLayout?.body[0].styles?.CartCheckoutSummaryPlaceOrderTextStyle?.value}`
                : globalComponentStyles?.Text?.fontStyle?.value != ''
                    ? globalComponentStyles?.Text?.fontStyle?.value
                    : `${themeColors?.CartCheckoutSummaryPlaceOrderTextStyle?.value}`,

        backgroundColor:
            layout?.cartCheckoutSummaryLayout?.body[0].styles
                ?.CartCheckoutSummaryPlaceOrderBackgroundColor?.value !== ''
                ? layout?.cartCheckoutSummaryLayout?.body[0].styles
                    ?.CartCheckoutSummaryPlaceOrderBackgroundColor?.value
                : globalComponentStyles?.Button?.backgroundColor?.value != ''
                    ? globalComponentStyles?.Button?.backgroundColor?.value
                    : themeColors?.CartCheckoutSummaryPlaceOrderBackgroundColor?.value,
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 2, p: 1 },
            }}
        >
            <DialogTitle
                sx={{ fontWeight: "bold", fontSize: "1.1rem", pb: 1, pr: 4 }}
            >
                Add new Address
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ px: 1, pt: 1 }}>
                <Typography
                    variant="body2"
                    sx={{ mb: 0.5, fontWeight: 500, fontSize: 14, color: "text.primary" }}
                >
                    Your Address : {states?.addressRegion}, {states?.selectedRegion?.name}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ mb: 0.5, fontWeight: 500, fontSize: 16, color: "text.primary" }}
                >
                    House / Street / Apartment No.
                </Typography>
                <TextField
                    placeholder="Enter your address"
                    fullWidth
                    size="small"
                    sx={{ mb: 2 }}
                    value={states?.addressRegion}
                    onChange={(e) => handleChangeInput(e.target.value)}
                />

                <Typography
                    variant="body2"
                    sx={{ mb: 0.5, fontWeight: 500, fontSize: 16, color: "text.primary" }}
                >
                    Region
                </Typography>
                <TextField
                    value={states?.selectedRegion?.name || ''}
                    fullWidth
                    size="small"
                    InputProps={{ readOnly: true }}
                    sx={{ mb: 1, backgroundColor: "#f5f5f5" }}

                />
                <Typography
                    variant="caption"
                    sx={{ display: "block", mb: 2, fontSize: 14, color: "text.secondary" }}
                >
                    To change your area/region, please do it from top header location
                    button.
                </Typography>

                <Box
                    sx={{
                        width: "100%",
                        height: 400,
                        borderRadius: 1,
                        overflow: "hidden",
                        position: "relative",
                        bgcolor: "#f0f0f0",
                    }}
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={position}
                        zoom={13}
                        onLoad={(map) => {
                            mapRef.current = map;
                        }}
                        onDragEnd={() => {
                            if (mapRef.current) {
                                const newCenter = mapRef.current.getCenter();
                                if (newCenter) {
                                    const lat = newCenter.lat();
                                    const lng = newCenter.lng();
                                    const newPos = { lat, lng };

                                    setPosition((prev) => {
                                        if (prev.lat !== lat || prev.lng !== lng) {
                                            return newPos;
                                        }
                                        return prev;
                                    });
                                    getAddressFromLatLng(lat, lng, states?.setAddressRegion);
                                    actions?.handleDisplayRegion(false)

                                    if (window.google && states?.selectedRegion?.polygon?.length) {
                                        const poly = new window.google.maps.Polygon({
                                            paths: states.selectedRegion.polygon,
                                        });
                                        const point = new window.google.maps.LatLng(lat, lng);
                                        const inside = window.google.maps.geometry.poly.containsLocation(point, poly);
                                        setIsInsidePolygon(inside);
                                    }
                                }
                            }
                        }}
                    >
                        <Marker position={position} />
                        <Polygon
                            paths={states?.selectedRegion?.polygon?.map(p => ({ lat: p.lat, lng: p.lng }))}
                            options={{
                                fillColor: "#FF0000",
                                fillOpacity: 0.3,
                                strokeColor: "#FF0000",
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                            }}
                        />
                    </GoogleMap>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleCurrentLocation}
                        sx={{
                            position: "absolute",
                            top: "10%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#fff",
                            color: "#000",
                            textTransform: "none",
                            fontSize: "0.8rem",
                            "&:hover": { backgroundColor: "#f5f5f5" },
                        }}
                    >
                        Current Location
                    </Button>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 1, pb: 1 }}>
                <Button
                    disableRipple
                    disableElevation
                    variant="contained"
                    type="submit"
                    fullWidth
                    disabled={!states?.addressRegion?.trim() || !isInsidePolygon}
                    sx={{
                        mt: 2,
                        '&:hover': {
                            backgroundColor:
                                layout?.cartCheckoutSummaryLayout?.body[0].styles
                                    ?.CartCheckoutSummaryPlaceOrderBackgroundColor?.value !== ''
                                    ? layout?.cartCheckoutSummaryLayout?.body[0].styles
                                        ?.CartCheckoutSummaryPlaceOrderBackgroundColor?.value
                                    : globalComponentStyles?.Button?.backgroundColor?.value != ''
                                        ? globalComponentStyles?.Button?.backgroundColor?.value
                                        : themeColors?.CartCheckoutSummaryPlaceOrderBackgroundColor
                                            ?.value,
                        },
                        ...getPlaceOrderButtonStyles,
                    }}
                    onClick={() => {
                        actions?.handleRegionAddressChange(states?.addressRegion);
                        onClose();
                    }}
                >
                    Save Address
                </Button>
            </DialogActions>
        </Dialog >
    );
}
