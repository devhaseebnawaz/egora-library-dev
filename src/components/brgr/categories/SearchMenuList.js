import React from "react";
import { StyledBox, StyledMenuItem } from "./style";

const SearchMenuList = ({ data, actions, onSelect, themeColors, layout, globalComponentStyles }) => {
  return (
    data.length > 0 && (
      <StyledBox>
        {data.map(({ description }, index) => (
          <StyledMenuItem
            themeColors={themeColors}
            layout={layout}
            globalComponentStyles={globalComponentStyles}
            key={index}
            onClick={() => {
              onSelect(description);
            }}
          >
            {actions?.splitText(description)}
          </StyledMenuItem>
        ))}
      </StyledBox>
    )
  );
};

export default SearchMenuList;
