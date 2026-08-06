'use client';

import React, { useState } from 'react';
import { Container } from '@mui/material';
import DiscountRoundedIcon from '@mui/icons-material/DiscountRounded';

const DEFAULTS = {
    enabled: true,
    showIcon: true,

    prefixText: 'Flat',
    discountValue: '15',
    suffixText: '% Off',


    textAnimationEnabled: true,
    textAnimationType: 'fade-up',
    textAnimationDuration: 650,

    circleAnimationEnabled: true,
    circleAnimationType: 'float',
    circleAnimationDuration: 1800,

    showConfetti: true,

    gradientStartColor: '#fffbea',
    gradientEndColor: '#f2eeee',
    gradientAngle: 90,

    height: 112,
    borderRadius: 20,

    padding: [0, 30, 0, 30],
    margin: [24, 0, 24, 0],

    border:
        '1px solid rgba(17, 24, 39, 0.08)',

    boxShadow:
        '0 2px 7px rgba(17, 24, 39, 0.14)',

    hoverBoxShadow:
        '0 8px 24px rgba(17, 24, 39, 0.14)',

    contentGap: 14,
    alignment: 'left',

    iconColor: '#529168',
    iconSize: 30,

    prefixColor: '#111827',
    prefixFont: 'Arial',
    prefixSize: [22, 26, 31, 36],
    prefixWeight: '700',
    prefixStyle: 'normal',

    discountCircleSize: 42,

    discountCircleBackgroundColor:
        '#ffc400',

    discountCircleTextColor:
        '#111827',

    discountCircleFont: 'Arial',

    discountCircleTextSize:
        [22, 25, 26, 28],

    discountCircleTextWeight:
        '700',

    discountCircleShadow:
        '0 8px 18px rgba(255, 196, 0, 0.28)',

    suffixColor: '#111827',
    suffixFont: 'Arial',
    suffixSize: [20, 24, 28, 32],
    suffixWeight: '700',
    suffixStyle: 'normal',
};

const hasValue = (value) =>
    value !== '' &&
    value !== null &&
    value !== undefined;

const getEditableValue = (
    prop,
    key,
    fallback
) => {
    const value =
        prop?.editable?.[key]?.value;

    return hasValue(value)
        ? value
        : fallback;
};

const getStyleValue = (
    styles,
    themeColors,
    key,
    fallback
) => {
    const componentValue =
        styles?.[key]?.value;

    if (hasValue(componentValue)) {
        return componentValue;
    }

    const themeValue =
        themeColors?.[key]?.value;

    return hasValue(themeValue)
        ? themeValue
        : fallback;
};

const toBoolean = (
    value,
    fallback = false
) => {
    if (
        value === true ||
        value === 'true'
    ) {
        return true;
    }

    if (
        value === false ||
        value === 'false'
    ) {
        return false;
    }

    return fallback;
};

const toNumber = (
    value,
    fallback = 0
) => {
    const parsedValue =
        Number(value);

    return Number.isFinite(
        parsedValue
    )
        ? parsedValue
        : fallback;
};

const toPixels = (
    value,
    fallback = 0
) =>
    `${Math.max(
        0,
        toNumber(value, fallback)
    )}px`;

const toSpacing = (
    value,
    fallback
) => {
    const spacing =
        Array.isArray(value) &&
            value.length === 4
            ? value
            : fallback;

    return spacing
        .map((item, index) =>
            toPixels(
                item,
                fallback[index]
            )
        )
        .join(' ');
};

const toResponsiveSizes = (
    value,
    fallback
) => {
    const sizes =
        Array.isArray(value) &&
            value.length === 4
            ? value
            : fallback;

    return sizes.map(
        (size, index) =>
            Math.max(
                1,
                toNumber(
                    size,
                    fallback[index]
                )
            )
    );
};

const TEXT_ANIMATIONS = {
    'fade-up':
        'promotionTextFadeUp',

    'fade-in':
        'promotionTextFadeIn',

    'slide-left':
        'promotionTextSlideLeft',

    'slide-right':
        'promotionTextSlideRight',
};

const CIRCLE_ANIMATIONS = {
    float:
        'promotionCircleFloat',

    bounce:
        'promotionCircleBounce',

    pulse:
        'promotionCirclePulse',
};

const CONFETTI_PARTICLES = [
    {
        x: '-28px',
        y: '-30px',
        color: '#ff647c',
        delay: 0,
    },
    {
        x: '5px',
        y: '-36px',
        color: '#6c63ff',
        delay: 180,
    },
    {
        x: '30px',
        y: '-24px',
        color: '#20b486',
        delay: 340,
    },
    {
        x: '34px',
        y: '18px',
        color: '#ff8a00',
        delay: 520,
    },
    {
        x: '-28px',
        y: '24px',
        color: '#3b82f6',
        delay: 700,
    },
    {
        x: '-36px',
        y: '-2px',
        color: '#ef4444',
        delay: 880,
    },
];

export default function PromotionBanner({
    prop = {},
    styles = {},
    themeColors = {},
}) {
    const [
        isHovered,
        setIsHovered,
    ] = useState(false);

    const getProp = (
        key,
        fallback
    ) =>
        getEditableValue(
            prop,
            key,
            fallback
        );

    const getStyle = (
        key,
        fallback
    ) =>
        getStyleValue(
            styles,
            themeColors,
            key,
            fallback
        );

    const promotionEnabled =
        toBoolean(
            getProp(
                'promotionEnabled',
                DEFAULTS.enabled
            ),
            DEFAULTS.enabled
        );

    const showIcon =
        toBoolean(
            getProp(
                'showIcon',
                DEFAULTS.showIcon
            ),
            DEFAULTS.showIcon
        );

    const prefixText =
        getProp(
            'prefixText',
            DEFAULTS.prefixText
        );

    const discountValue =
        getProp(
            'discountValue',
            DEFAULTS.discountValue
        );

    const suffixText =
        getProp(
            'suffixText',
            DEFAULTS.suffixText
        );

    const textAnimationEnabled =
        toBoolean(
            getProp(
                'textAnimationEnabled',
                DEFAULTS.textAnimationEnabled
            ),
            DEFAULTS.textAnimationEnabled
        );

    const textAnimationType =
        getProp(
            'textAnimationType',
            DEFAULTS.textAnimationType
        );

    const textAnimationDuration =
        Math.max(
            0,
            toNumber(
                getProp(
                    'textAnimationDuration',
                    DEFAULTS.textAnimationDuration
                ),
                DEFAULTS.textAnimationDuration
            )
        );

    const circleAnimationEnabled =
        toBoolean(
            getProp(
                'circleAnimationEnabled',
                DEFAULTS.circleAnimationEnabled
            ),
            DEFAULTS.circleAnimationEnabled
        );

    const circleAnimationType =
        getProp(
            'circleAnimationType',
            DEFAULTS.circleAnimationType
        );

    const circleAnimationDuration =
        Math.max(
            300,
            toNumber(
                getProp(
                    'circleAnimationDuration',
                    DEFAULTS.circleAnimationDuration
                ),
                DEFAULTS.circleAnimationDuration
            )
        );

    const showConfetti =
        toBoolean(
            getProp(
                'showConfetti',
                DEFAULTS.showConfetti
            ),
            DEFAULTS.showConfetti
        );

    if (!promotionEnabled) {
        return null;
    }

    const margin =
        getStyle(
            'PromotionBannerMargin',
            DEFAULTS.margin
        );

    const normalizedMargin =
        Array.isArray(margin) &&
            margin.length === 4
            ? margin
            : DEFAULTS.margin;

    const prefixSizes =
        toResponsiveSizes(
            getStyle(
                'PromotionBannerPrefixSize',
                DEFAULTS.prefixSize
            ),
            DEFAULTS.prefixSize
        );

    const discountSizes =
        toResponsiveSizes(
            getStyle(
                'PromotionBannerDiscountTextSize',
                DEFAULTS.discountCircleTextSize
            ),
            DEFAULTS.discountCircleTextSize
        );

    const suffixSizes =
        toResponsiveSizes(
            getStyle(
                'PromotionBannerSuffixSize',
                DEFAULTS.suffixSize
            ),
            DEFAULTS.suffixSize
        );

    const gradientStartColor =
        getStyle(
            'PromotionBannerGradientStartColor',
            DEFAULTS.gradientStartColor
        );

    const gradientEndColor =
        getStyle(
            'PromotionBannerGradientEndColor',
            DEFAULTS.gradientEndColor
        );

    const gradientAngle =
        toNumber(
            getStyle(
                'PromotionBannerGradientAngle',
                DEFAULTS.gradientAngle
            ),
            DEFAULTS.gradientAngle
        );

    const alignment =
        getStyle(
            'PromotionBannerAlignment',
            DEFAULTS.alignment
        );

    const justifyContent =
        alignment === 'center'
            ? 'center'
            : alignment === 'right'
                ? 'flex-end'
                : 'flex-start';



    const textAnimationName =
        TEXT_ANIMATIONS[
        textAnimationType
        ];

    const circleAnimationName =
        CIRCLE_ANIMATIONS[
        circleAnimationType
        ];


    const getTextAnimation = (
        delay = 0
    ) => {
        if (
            !textAnimationEnabled ||
            !textAnimationName
        ) {
            return {
                animation: 'none',
            };
        }

        return {
            animation:
                `${textAnimationName} ` +
                `${textAnimationDuration}ms ` +
                'cubic-bezier(.22, 1, .36, 1) ' +
                'both',

            animationDelay:
                `${delay}ms`,
        };
    };

    return (
        <Container
            component="section"
            aria-label={
                `${prefixText} ` +
                `${discountValue} ` +
                `${suffixText}`
            }
            sx={{
                mt: `${toNumber(
                    normalizedMargin[0],
                    DEFAULTS.margin[0]
                )}px`,

                mb: `${toNumber(
                    normalizedMargin[2],
                    DEFAULTS.margin[2]
                )}px`,
            }}
        >
            <style>{`
        @keyframes promotionTextFadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes promotionTextFadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes promotionTextSlideLeft {
          from {
            opacity: 0;
            transform: translateX(20px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes promotionTextSlideRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes promotionCircleFloat {
          0%,
          100% {
            transform:
              translateY(0)
              rotate(0deg);
          }

          50% {
            transform:
              translateY(-8px)
              rotate(-2deg);
          }
        }

        @keyframes promotionCircleBounce {
          0%,
          100% {
            transform:
              translateY(0)
              scale(1);
          }

          45% {
            transform:
              translateY(-10px)
              scale(1.03);
          }

          65% {
            transform:
              translateY(-3px)
              scale(.99);
          }
        }

        @keyframes promotionCirclePulse {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.09);
          }
        }

        @keyframes promotionConfettiPop {
          0%,
          100% {
            opacity: 0;

            transform:
              translate(0, 0)
              rotate(0deg)
              scale(.5);
          }

          18% {
            opacity: 1;
          }

          55% {
            opacity: .95;

            transform:
              translate(
                var(--confetti-x),
                var(--confetti-y)
              )
              rotate(160deg)
              scale(1);
          }

          82% {
            opacity: 0;

            transform:
              translate(
                var(--confetti-x),
                var(--confetti-y)
              )
              rotate(260deg)
              scale(.75);
          }
        }

        .promotion-offer-card {
          width: 100%;
          box-sizing: border-box;

          display: flex;
          align-items: center;

          overflow: hidden;
          text-decoration: none;

          transition:
            transform 220ms ease,
            box-shadow 220ms ease;
        }

        .promotion-offer-card:hover {
          transform: translateY(-2px);
        }

        .promotion-offer-content {
          display: flex;
          align-items: center;

          min-width: 0;
          white-space: nowrap;
        }

        .promotion-offer-prefix,
        .promotion-offer-suffix {
          line-height: 1;
          letter-spacing: -.02em;
          will-change:
            transform,
            opacity;
        }

        .promotion-offer-circle-wrapper {
          position: relative;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;
        }

        .promotion-offer-circle {
          position: relative;
          z-index: 2;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          line-height: 1;

          will-change: transform;
        }

        .promotion-offer-confetti {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 1;

          width: 6px;
          height: 10px;

          margin-left: -3px;
          margin-top: -5px;

          border-radius: 3px;

          pointer-events: none;

          animation-name:
            promotionConfettiPop;

          animation-timing-function:
            ease-in-out;

          animation-iteration-count:
            infinite;

          will-change:
            transform,
            opacity;
        }

        .promotion-offer-prefix {
          font-size: ${prefixSizes[0]}px;
        }

        .promotion-offer-circle {
          font-size: ${discountSizes[0]}px;
        }

        .promotion-offer-suffix {
          font-size: ${suffixSizes[0]}px;
        }

        @media (min-width: 601px) {
          .promotion-offer-prefix {
            font-size: ${prefixSizes[1]}px;
          }

          .promotion-offer-circle {
            font-size: ${discountSizes[1]}px;
          }

          .promotion-offer-suffix {
            font-size: ${suffixSizes[1]}px;
          }
        }

        @media (min-width: 901px) {
          .promotion-offer-prefix {
            font-size: ${prefixSizes[2]}px;
          }

          .promotion-offer-circle {
            font-size: ${discountSizes[2]}px;
          }

          .promotion-offer-suffix {
            font-size: ${suffixSizes[2]}px;
          }
        }

        @media (min-width: 1400px) {
          .promotion-offer-prefix {
            font-size: ${prefixSizes[3]}px;
          }

          .promotion-offer-circle {
            font-size: ${discountSizes[3]}px;
          }

          .promotion-offer-suffix {
            font-size: ${suffixSizes[3]}px;
          }
        }

        @media (max-width: 600px) {
          .promotion-offer-card {
            min-height: 86px !important;

            padding-left: 18px !important;
            padding-right: 18px !important;
          }

          .promotion-offer-content {
            gap: 9px !important;
          }
        }

        @media (max-width: 390px) {
          .promotion-offer-icon {
            display: none !important;
          }
        }

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .promotion-offer-prefix,
          .promotion-offer-suffix,
          .promotion-offer-circle,
          .promotion-offer-confetti {
            animation: none !important;
          }
        }
      `}</style>

            <div
                className="promotion-offer-card"
                onMouseEnter={() =>
                    setIsHovered(true)
                }
                onMouseLeave={() =>
                    setIsHovered(false)
                }
                style={{
                    minHeight:
                        toPixels(
                            getStyle(
                                'PromotionBannerHeight',
                                DEFAULTS.height
                            ),
                            DEFAULTS.height
                        ),

                    padding:
                        toSpacing(
                            getStyle(
                                'PromotionBannerPadding',
                                DEFAULTS.padding
                            ),
                            DEFAULTS.padding
                        ),

                    justifyContent,

                    background:
                        `linear-gradient(` +
                        `${gradientAngle}deg, ` +
                        `${gradientStartColor} 0%, ` +
                        `${gradientEndColor} 100%)`,

                    borderRadius:
                        toPixels(
                            getStyle(
                                'PromotionBannerBorderRadius',
                                DEFAULTS.borderRadius
                            ),
                            DEFAULTS.borderRadius
                        ),

                    border:
                        getStyle(
                            'PromotionBannerBorder',
                            DEFAULTS.border
                        ),

                    boxShadow:
                        isHovered
                            ? getStyle(
                                'PromotionBannerHoverBoxShadow',
                                DEFAULTS.hoverBoxShadow
                            )
                            : getStyle(
                                'PromotionBannerBoxShadow',
                                DEFAULTS.boxShadow
                            ),

                    cursor: 'default',
                }}
            >
                <div
                    className="promotion-offer-content"
                    style={{
                        gap:
                            toPixels(
                                getStyle(
                                    'PromotionBannerContentGap',
                                    DEFAULTS.contentGap
                                ),
                                DEFAULTS.contentGap
                            ),
                    }}
                >
                    {showIcon && (
                        <DiscountRoundedIcon
                            className="promotion-offer-icon"
                            aria-hidden="true"
                            sx={{
                                flexShrink: 0,

                                fontSize:
                                    `${toNumber(
                                        getStyle(
                                            'PromotionBannerIconSize',
                                            DEFAULTS.iconSize
                                        ),
                                        DEFAULTS.iconSize
                                    )}px`,

                                color:
                                    getStyle(
                                        'PromotionBannerIconColor',
                                        DEFAULTS.iconColor
                                    ),
                            }}
                        />
                    )}

                    {prefixText && (
                        <span
                            className="promotion-offer-prefix"
                            style={{
                                ...getTextAnimation(0),

                                color:
                                    getStyle(
                                        'PromotionBannerPrefixColor',
                                        DEFAULTS.prefixColor
                                    ),

                                fontFamily:
                                    getStyle(
                                        'PromotionBannerPrefixFont',
                                        DEFAULTS.prefixFont
                                    ),

                                fontWeight:
                                    getStyle(
                                        'PromotionBannerPrefixWeight',
                                        DEFAULTS.prefixWeight
                                    ),

                                fontStyle:
                                    getStyle(
                                        'PromotionBannerPrefixStyle',
                                        DEFAULTS.prefixStyle
                                    ),
                            }}
                        >
                            {prefixText}
                        </span>
                    )}

                    {discountValue && (
                        <span className="promotion-offer-circle-wrapper">
                            {showConfetti &&
                                circleAnimationEnabled &&
                                CONFETTI_PARTICLES.map(
                                    (
                                        particle,
                                        index
                                    ) => (
                                        <span
                                            key={index}
                                            aria-hidden="true"
                                            className="promotion-offer-confetti"
                                            style={{
                                                '--confetti-x':
                                                    particle.x,

                                                '--confetti-y':
                                                    particle.y,

                                                backgroundColor:
                                                    particle.color,

                                                animationDuration:
                                                    `${circleAnimationDuration}ms`,

                                                animationDelay:
                                                    `${particle.delay}ms`,
                                            }}
                                        />
                                    )
                                )}

                            <span
                                className="promotion-offer-circle"
                                style={{
                                    width:
                                        toPixels(
                                            getStyle(
                                                'PromotionBannerDiscountCircleSize',
                                                DEFAULTS.discountCircleSize
                                            ),
                                            DEFAULTS.discountCircleSize
                                        ),

                                    height:
                                        toPixels(
                                            getStyle(
                                                'PromotionBannerDiscountCircleSize',
                                                DEFAULTS.discountCircleSize
                                            ),
                                            DEFAULTS.discountCircleSize
                                        ),

                                    borderRadius: '50%',

                                    color:
                                        getStyle(
                                            'PromotionBannerDiscountTextColor',
                                            DEFAULTS.discountCircleTextColor
                                        ),

                                    backgroundColor:
                                        getStyle(
                                            'PromotionBannerDiscountCircleBackgroundColor',
                                            DEFAULTS.discountCircleBackgroundColor
                                        ),

                                    boxShadow:
                                        getStyle(
                                            'PromotionBannerDiscountCircleShadow',
                                            DEFAULTS.discountCircleShadow
                                        ),

                                    fontFamily:
                                        getStyle(
                                            'PromotionBannerDiscountFont',
                                            DEFAULTS.discountCircleFont
                                        ),

                                    fontWeight:
                                        getStyle(
                                            'PromotionBannerDiscountTextWeight',
                                            DEFAULTS.discountCircleTextWeight
                                        ),

                                    animation:
                                        circleAnimationEnabled &&
                                            circleAnimationName
                                            ? `${circleAnimationName} ${circleAnimationDuration}ms ease-in-out infinite`
                                            : 'none',
                                }}
                            >
                                {discountValue}
                            </span>
                        </span>
                    )}

                    {suffixText && (
                        <span
                            className="promotion-offer-suffix"
                            style={{
                                ...getTextAnimation(140),

                                color:
                                    getStyle(
                                        'PromotionBannerSuffixColor',
                                        DEFAULTS.suffixColor
                                    ),

                                fontFamily:
                                    getStyle(
                                        'PromotionBannerSuffixFont',
                                        DEFAULTS.suffixFont
                                    ),

                                fontWeight:
                                    getStyle(
                                        'PromotionBannerSuffixWeight',
                                        DEFAULTS.suffixWeight
                                    ),

                                fontStyle:
                                    getStyle(
                                        'PromotionBannerSuffixStyle',
                                        DEFAULTS.suffixStyle
                                    ),
                            }}
                        >
                            {suffixText}
                        </span>
                    )}
                </div>
            </div>
        </Container>
    );
}