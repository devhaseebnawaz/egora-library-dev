export const getFontSize = (baseFontSize, screen, smallScreeSize) => {
    return screen ? smallScreeSize : baseFontSize;
};

export const getIconWidthHeight = (baseWidthHeight, screen, customeWidthHeight) => {
    return screen ? customeWidthHeight : baseWidthHeight;
};


export const  getScreenSizeCategory = ()  => {
    const width = window.innerWidth;
    if (width <= 600) {
      return 0;  
    } else if (width > 600 && width <= 850) {
      return 1;
    } else if (width > 850 && width <= 1200) {
      return 2; 
    } else {
      return 3;
    }
  }