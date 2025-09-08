import React, { useState } from "react";
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

export default function RefineLocationModal({
    open,
    onClose,
    states,
    actions,
    currentCoords,
    onSave,
}) {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    const [userLocation, setUserLocation] = useState(null);

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
                        center={states?.markerPosition}
                        zoom={15}
                        onClick={actions?.handleMapClick}
                        options={{
                            fullscreenControl: false,
                            streetViewControl: false,
                            mapTypeControl: true,
                            zoomControl: true,
                        }}
                        onLoad={(map) => {
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

                            locationButton.addEventListener("click", () => {
                                if (navigator.geolocation) {
                                    navigator.geolocation.getCurrentPosition(
                                        (pos) => {
                                            const posCoords = {
                                                lat: pos.coords.latitude,
                                                lng: pos.coords.longitude,
                                            };

                                            setUserLocation(posCoords);
                                            states.setMarkerPosition(posCoords);
                                            map.setCenter(posCoords);

                                            const geocoder = new window.google.maps.Geocoder();
                                            geocoder.geocode({ location: posCoords }, (results, status) => {
                                                if (status === "OK" && results[0]) {
                                                    const formattedAddress = results[0].formatted_address;
                                                    console.log("Formatted Address: ", formattedAddress);

                                                    actions.updateLocation(formattedAddress);
                                                } else {
                                                    console.error("Geocoder failed due to: " + status);
                                                }
                                            });
                                        },
                                        (err) => {
                                            console.error("Geolocation error:", err);
                                        },
                                        {
                                            enableHighAccuracy: true,
                                            timeout: 10000,
                                            maximumAge: 0,
                                        }
                                    );
                                }
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
                        sx={{
                            backgroundColor: "#000",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "16px",
                            borderRadius: "12px",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#333",
                            },
                        }}
                    >
                        Update
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
