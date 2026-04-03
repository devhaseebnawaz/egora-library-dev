import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import Options from "./Options";

export default function Group({
  states,
  themeColors,
  layout,
  choiceGroup,
  hanldeSelectOption,
  selectedSauces,
  selectedVariant,
  getDescriptionStyles,
  getHeadingStyles,
  ...other
}) {

  return (
    <>
      {choiceGroup && (
        <>
          <Typography sx={{ fontSize: 15, ...getHeadingStyles }} >
            {choiceGroup.name}
            <Typography sx={{ fontSize: 12, ml: 1, ...getHeadingStyles }} variant="span">
              ({choiceGroup.quantity}
              {choiceGroup.required ? " Required" : " Optional"})
            </Typography>
          </Typography>

          <Options
            states={states}
            themeColors={themeColors}
            layout={layout}
            getDescriptionStyles={getDescriptionStyles}
            getHeadingStyles={getHeadingStyles}
            choiceGroups={choiceGroup}
            choiceGroupId={choiceGroup.id}
            hanldeSelectOption={hanldeSelectOption}
            selectedSauces={selectedSauces}
            selectedVariant={selectedVariant}
          />
        </>
      )}
    </>
  );
}
