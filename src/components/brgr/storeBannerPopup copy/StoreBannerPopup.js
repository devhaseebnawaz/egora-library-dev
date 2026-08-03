'use client';

import React, { useState } from 'react';

const DEFAULTS = {
    imageWidth: 500,
    imageHeight: 500,
    imageFit: 'cover',
    imageBorderRadius: 0,
    imagePadding: [0, 0, 0, 0],
    imageMargin: [0, 0, 0, 0],

    popupWidth: 500,
    popupHeight: 500,
    popupBackgroundColor: '#ffffff',
    popupBorderRadius: 16,
    popupPadding: [0, 0, 0, 0],

    overlayColor: '#000000',
    overlayOpacity: 0.65,

    closeButtonSize: 40,
    closeButtonColor: '#ffffff',
    closeButtonBackgroundColor: '#000000',
    closeButtonBorderRadius: 50,
    closeButtonTop: 12,
    closeButtonRight: 12,
};

const EMPTY_VALUES = ['', null, undefined];

const hasValue = (value) => {
    return !EMPTY_VALUES.includes(value);
};

const toNumber = (value, fallback) => {
    const parsed = Number(value);

    return Number.isFinite(parsed)
        ? parsed
        : fallback;
};

const toPixels = (value, fallback) => {
    return `${Math.max(0, toNumber(value, fallback))}px`;
};

const toOffsetPixels = (value, fallback) => {
    return `${toNumber(value, fallback)}px`;
};

const toSpacing = (
    value,
    fallback = [0, 0, 0, 0]
) => {
    const spacing =
        Array.isArray(value) && value.length === 4
            ? value
            : fallback;

    return spacing
        .map((item) => toPixels(item, 0))
        .join(' ');
};

const clampOpacity = (value) => {
    return Math.min(
        1,
        Math.max(
            0,
            toNumber(value, DEFAULTS.overlayOpacity)
        )
    );
};

export default function StoreBannerPopup({
    states,
    previewMode = false,
    prop = {},
    styles = {},
    themeColors = {},
}) {
    const [internalOpen, setInternalOpen] = useState(true);

    const bannerImage =
        prop?.editable?.bannerImage?.value || '';

    const bannerAltText =
        prop?.editable?.bannerAltText?.value ||
        'Promotional banner';

    const popupEnabled =
        prop?.editable?.popupEnabled?.value ?? true;

    const getStyleValue = (key, fallback) => {
        const localValue = styles?.[key]?.value;

        if (hasValue(localValue)) {
            return localValue;
        }

        const themeValue = themeColors?.[key]?.value;

        if (hasValue(themeValue)) {
            return themeValue;
        }

        return fallback;
    };

    const isExternallyControlled =
        typeof states?.storeBannerPopupOpen === 'boolean';

    const isOpen = previewMode
        ? true
        : isExternallyControlled
            ? states.storeBannerPopupOpen
            : internalOpen;

    const closePopup = () => {
        if (previewMode) {
            return;
        }

        if (
            typeof states?.setStoreBannerPopupOpen ===
            'function'
        ) {
            states.setStoreBannerPopupOpen(false);
            return;
        }

        setInternalOpen(false);
    };

    const popupStyles = {
        width: toPixels(
            getStyleValue(
                'StoreBannerPopupWidth',
                DEFAULTS.popupWidth
            ),
            DEFAULTS.popupWidth
        ),

        height: toPixels(
            getStyleValue(
                'StoreBannerPopupHeight',
                DEFAULTS.popupHeight
            ),
            DEFAULTS.popupHeight
        ),

        maxWidth: previewMode
            ? 'calc(100% - 32px)'
            : 'calc(100vw - 32px)',

        maxHeight: previewMode
            ? 'calc(100% - 32px)'
            : 'calc(100vh - 32px)',

        backgroundColor: getStyleValue(
            'StoreBannerPopupBackgroundColor',
            DEFAULTS.popupBackgroundColor
        ),

        borderRadius: toPixels(
            getStyleValue(
                'StoreBannerPopupBorderRadius',
                DEFAULTS.popupBorderRadius
            ),
            DEFAULTS.popupBorderRadius
        ),

        padding: toSpacing(
            getStyleValue(
                'StoreBannerPopupPadding',
                DEFAULTS.popupPadding
            ),
            DEFAULTS.popupPadding
        ),
    };

    const imageStyles = {
        width: toPixels(
            getStyleValue(
                'StoreBannerPopupImageWidth',
                DEFAULTS.imageWidth
            ),
            DEFAULTS.imageWidth
        ),

        height: toPixels(
            getStyleValue(
                'StoreBannerPopupImageHeight',
                DEFAULTS.imageHeight
            ),
            DEFAULTS.imageHeight
        ),

        maxWidth: '100%',
        maxHeight: '100%',

        objectFit: getStyleValue(
            'StoreBannerPopupImageFit',
            DEFAULTS.imageFit
        ),

        borderRadius: toPixels(
            getStyleValue(
                'StoreBannerPopupImageBorderRadius',
                DEFAULTS.imageBorderRadius
            ),
            DEFAULTS.imageBorderRadius
        ),

        padding: toSpacing(
            getStyleValue(
                'StoreBannerPopupImagePadding',
                DEFAULTS.imagePadding
            ),
            DEFAULTS.imagePadding
        ),

        margin: toSpacing(
            getStyleValue(
                'StoreBannerPopupImageMargin',
                DEFAULTS.imageMargin
            ),
            DEFAULTS.imageMargin
        ),
    };

    if (
        !popupEnabled ||
        !isOpen ||
        (!bannerImage && !previewMode)
    ) {
        return null;
    }

    const overlayColor = getStyleValue(
        'StoreBannerPopupOverlayColor',
        DEFAULTS.overlayColor
    );

    const overlayOpacity = clampOpacity(
        getStyleValue(
            'StoreBannerPopupOverlayOpacity',
            DEFAULTS.overlayOpacity
        )
    );

    const closeButtonSize = toNumber(
        getStyleValue(
            'StoreBannerPopupCloseButtonSize',
            DEFAULTS.closeButtonSize
        ),
        DEFAULTS.closeButtonSize
    );

    const overlayStyle = {
        position: previewMode
            ? 'relative'
            : 'fixed',

        inset: previewMode
            ? undefined
            : 0,

        width: '100%',

        minHeight: previewMode
            ? 560
            : undefined,

        height: previewMode
            ? 'min(70vh, 680px)'
            : '100vh',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: 'transparent',
        opacity: 1,

        zIndex: previewMode
            ? 1
            : 1500,

        overflow: 'hidden',
        isolation: 'isolate',
    };

    return (
        <div
            role="dialog"
            aria-modal={previewMode ? undefined : true}
            aria-label={bannerAltText}
            style={overlayStyle}
        >
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: overlayColor,
                    opacity: overlayOpacity,
                    zIndex: 0,
                }}
            />

            <div
                style={{
                    ...popupStyles,
                    position: 'relative',
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'auto',
                    boxShadow:
                        '0 24px 80px rgba(0, 0, 0, 0.28)',
                    zIndex: 1,
                }}
            >
                {bannerImage ? (
                    <img
                        src={bannerImage}
                        alt={bannerAltText}
                        style={{
                            ...imageStyles,
                            display: 'block',
                            boxSizing: 'border-box',
                            flexShrink: 0,
                        }}
                    />
                ) : (
                    <div
                        style={{
                            ...imageStyles,
                            minWidth: 220,
                            minHeight: 220,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxSizing: 'border-box',
                            border:
                                '2px dashed rgba(0, 0, 0, 0.2)',
                            color: '#666666',
                            textAlign: 'center',
                            fontSize: 16,
                            lineHeight: 1.5,
                        }}
                    >
                        Upload a promotional banner image
                    </div>
                )}

                <button
                    type="button"
                    onClick={closePopup}
                    aria-label="Close promotional banner"
                    style={{
                        position: 'absolute',

                        top: toOffsetPixels(
                            getStyleValue(
                                'StoreBannerPopupCloseButtonTop',
                                DEFAULTS.closeButtonTop
                            ),
                            DEFAULTS.closeButtonTop
                        ),

                        right: toOffsetPixels(
                            getStyleValue(
                                'StoreBannerPopupCloseButtonRight',
                                DEFAULTS.closeButtonRight
                            ),
                            DEFAULTS.closeButtonRight
                        ),

                        width: toPixels(
                            closeButtonSize,
                            DEFAULTS.closeButtonSize
                        ),

                        height: toPixels(
                            closeButtonSize,
                            DEFAULTS.closeButtonSize
                        ),

                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',

                        padding: 0,
                        border: 0,

                        borderRadius: toPixels(
                            getStyleValue(
                                'StoreBannerPopupCloseButtonBorderRadius',
                                DEFAULTS.closeButtonBorderRadius
                            ),
                            DEFAULTS.closeButtonBorderRadius
                        ),

                        color: getStyleValue(
                            'StoreBannerPopupCloseButtonColor',
                            DEFAULTS.closeButtonColor
                        ),

                        backgroundColor: getStyleValue(
                            'StoreBannerPopupCloseButtonBackgroundColor',
                            DEFAULTS.closeButtonBackgroundColor
                        ),

                        fontSize: toPixels(
                            Math.max(
                                18,
                                closeButtonSize * 0.65
                            ),
                            26
                        ),

                        fontWeight: 400,
                        lineHeight: 1,

                        cursor: previewMode
                            ? 'default'
                            : 'pointer',

                        zIndex: 2,
                    }}
                >
                    ×
                </button>
            </div>
        </div>
    );
}