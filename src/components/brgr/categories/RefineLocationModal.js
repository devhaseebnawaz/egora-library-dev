import React, { useEffect, useRef, useState } from "react";
import {
    Modal,
    Box,
    Typography,
    Button,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";


const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width:"95%",
    maxWidth: 600,
    height:"95%",
    maxHeight: 600,
    backgroundColor: "#fff",
    borderRadius: "20px",
    boxShadow: 24,
    overflow: "hidden",
};

const mapContainerStyle = {
    width: "100%",
    height: "calc(100% - 120px)",
};
const libraries =["geometry"]

export default function RefineLocationModal({
    open,
    onClose,
    states,
    actions,
    currentCoords,
    onSave,
    isLocationAllowed,
    setIsLocationAllowed,
    isGettingCurrentLocation
}) {

    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current && states?.markerPosition) {
            mapRef.current.panTo(states.markerPosition);
            mapRef.current.setZoom(15);
        }
    }, [states?.markerPosition]);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
    });

    const [userLocation, setUserLocation] = useState(null);
    const [isGettingLocation, setIsGettingLocation] = useState(false);
    const isLocationLoading = isGettingLocation || isGettingCurrentLocation;
    // const handleUpdate = () => {
    //     onSave( states?.markerPosition);
    //     onClose();
    // };
    const handleUpdate = async () => {
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ location:  states?.markerPosition }, (results, status) => {
            if (status === "OK" && results[0]) {
                const formattedAddress = results[0].formatted_address;

                onSave({
                    coords:  states?.markerPosition,
                    address: formattedAddress,
                });
                actions.updateLocation(formattedAddress)
                onClose();
            } else {
                onSave({
                    coords:  states?.markerPosition,
                    address: "Custom Location Selected",
                });
                onClose();
            }
        });
    };
    const getGeolocationPermissionState = async () => {
        try {
            if (!navigator.permissions?.query) return null;

            const result = await navigator.permissions.query({
                name: "geolocation",
            });

            return result.state;
        } catch (error) {
            return null;
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Box
                    sx={{
                        height: "60px",
                        px: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #e0e0e0",
                    }}
                >
                    <Typography fontWeight={700} fontSize="16px">
                        Refine Your Delivery Location
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={states?.markerPosition || currentCoords || { lat: 31.5204, lng: 74.3587 }}
                        zoom={15}
                        onClick={actions?.handleMapClick}
                        options={{
                            fullscreenControl: false,
                            streetViewControl: false,
                            mapTypeControl: true,
                            zoomControl: true,
                        }}
                        onLoad={(map) => {
                            mapRef.current = map;
                            const locationButton = document.createElement("button");
                            locationButton.textContent = "◉";
                            locationButton.style.background = "#fff";
                            locationButton.style.border = "none";
                            locationButton.style.padding = "8px 12px";
                            locationButton.style.margin = "12px";
                            locationButton.style.fontSize = "16px";
                            locationButton.style.borderRadius = "50%";
                            locationButton.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
                            locationButton.style.cursor = "pointer";
                            locationButton.title = "Getting current location";
                            locationButton.addEventListener("mouseenter", () => {
                                locationButton.style.color = "black";
                            });
                            locationButton.addEventListener("mouseleave", () => {
                                locationButton.style.color = "rgb(100 90 90)";
                            });

                            map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);

                            locationButton.addEventListener("click", async () => {
                                if (!navigator.geolocation) {
                                    states?.setErrorForDeniedLocation?.(
                                        "Geolocation is not supported by your browser."
                                    );
                                    return;
                                }

                                const permissionState = await getGeolocationPermissionState();

                                if (permissionState === "denied") {
                                    setIsGettingLocation(false);
                                    setIsLocationAllowed(false);

                                    states?.setErrorForDeniedLocation?.(
                                        "Location permission is blocked. Please allow location from browser settings and try again."
                                    );

                                    return;
                                }

                                setIsGettingLocation(true);
                                setIsLocationAllowed(false);
                                states?.setErrorForDeniedLocation?.("");

                                navigator.geolocation.getCurrentPosition(
                                    (pos) => {
                                        const posCoords = {
                                            lat: pos.coords.latitude,
                                            lng: pos.coords.longitude,
                                        };

                                        setUserLocation(posCoords);
                                        states.setMarkerPosition(posCoords);
                                        map.setCenter(posCoords);
                                        setIsLocationAllowed(true);

                                        const geocoder = new window.google.maps.Geocoder();

                                        geocoder.geocode({ location: posCoords }, (results, status) => {
                                            setIsGettingLocation(false);

                                            if (status === "OK" && results[0]) {
                                                const formattedAddress = results[0].formatted_address;

                                                actions.updateLocation(formattedAddress);
                                                states?.setCurrentLocation?.(formattedAddress);
                                                states?.setLatLongForDelivery?.(`${posCoords.lat},${posCoords.lng}`);
                                            } else {
                                                setIsLocationAllowed(false);
                                                states?.setErrorForDeniedLocation?.(
                                                    "Unable to fetch address from your current location."
                                                );
                                            }
                                        });
                                    },
                                    async (err) => {
                                        setIsGettingLocation(false);
                                        setIsLocationAllowed(false);

                                        const permissionState = await getGeolocationPermissionState();

                                        if (
                                            err.code === err.PERMISSION_DENIED &&
                                            permissionState === "denied"
                                        ) {
                                            states?.setErrorForDeniedLocation?.(
                                                "Location permission is blocked. Please allow location from browser settings and try again."
                                            );
                                        }
                                    },
                                    {
                                        enableHighAccuracy: true,
                                        maximumAge: 0,
                                    }
                                );
                            });
                        }}
                    >
                        <Marker
                            position={states?.markerPosition}
                            draggable
                            onDragEnd={actions?.handleMarkerDragEnd}
                        />

                        {userLocation && (
                            <Marker
                                position={userLocation}
                                icon={{
                                    path: window.google.maps.SymbolPath.CIRCLE,
                                    scale: 8,
                                    fillColor: "#4285F4",
                                    fillOpacity: 1,
                                    strokeWeight: 2,
                                    strokeColor: "#fff",
                                }}
                            />
                        )}
                    </GoogleMap>
                ) : (
                    <Box
                        sx={{
                            height: mapContainerStyle.height,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography>Loading map...</Typography>
                    </Box>
                )}

                <Box
                    sx={{
                        height: "40px",
                        p: 1,
                        borderTop: "1px solid #e0e0e0",
                        backgroundColor: "#fff",
                    }}
                >
                    <Button
                        fullWidth
                        onClick={handleUpdate}
                        disabled={!isLocationAllowed || isLocationLoading}
                        sx={{
                            backgroundColor: !isLocationAllowed || isLocationLoading ? "#999" : "#000",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "16px",
                            borderRadius: "12px",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: !isLocationAllowed || isLocationLoading ? "#999" : "#333",
                            },
                            "&.Mui-disabled": {
                                backgroundColor: "#999",
                                color: "#fff",
                                cursor: "not-allowed",
                            },
                        }}
                    >
                        {isLocationLoading ? "Getting Location..." : "Update"}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
