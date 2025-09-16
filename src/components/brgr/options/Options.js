import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { fNumber } from "../../../utils/formatNumber";

export default function Options({
  layout,
  choiceGroups,
  choiceGroupId,
  hanldeSelectOption,
  selectedSauces,
  selectedVariant,
  getDescriptionStyles,
  ...other
}) {

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 1,
        marginTop: 1,
        justifyContent: { sm: 'flex-start' },
      }}
    >
      {choiceGroups && choiceGroups?.items.map((item) => {
        const isSelected = selectedSauces?.items?.some((sauce) =>
          sauce.items.some((sauceItem) => sauceItem.id === item.id)
        );
        return (
          <Button
            size="small"
            sx={{ 
              minWidth: { 
                xs: 'calc(50% - 8px)', 
                sm: 'calc(50% - 8px)',
                md: 120 
              }, 
              minHeight: 40, 
              flexGrow: { xs: 0, sm: 0, md: 0 },
              ml: { xs: 0, sm: 0, md: 0 },
              mb: 1,
              ...getDescriptionStyles, 
              border: `solid ${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalButtonBorderColor?.value}`, 
              borderRadius: `${layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalButtonBorderRadius?.value}px` , 
              backgroundColor: isSelected ? layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalButtonSelectedBackgroundColor?.value : layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalButtonBackgroundColor?.value,
              color: isSelected ? layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalSelectedDescriptionTextColor?.value  : layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalDescriptionTextColor?.value, 
              '&:hover': {
                backgroundColor: isSelected ?  layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalButtonSelectedHoverColor?.value : layout?.itemDetailModalLayout?.body[0].styles?.ItemDetailModalButtonHoverColor?.value, 
              }
            }}
            variant={isSelected ? "contained" : "outlined"}
            key={item.id}
            onClick={() => hanldeSelectOption(choiceGroups, item)}
          >
            {item?.item} (Rs. { fNumber(item?.price)})
          </Button>
        );
      })}
    </Box>
  );
}
