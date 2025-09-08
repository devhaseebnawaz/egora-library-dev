import React from "react";
import { StyledBox, StyledMenuItem } from "./style";

const SearchMenuList = ({ data, actions, onSelect }) => {    
  return (
    data.length > 0 && (
      <StyledBox>
        {data.map(({ description }, index) => (
          <StyledMenuItem
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
