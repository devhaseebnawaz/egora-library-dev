import React from 'react';
import { Box, Typography , Container} from '@mui/material';
import SearchBar from '../search/SearchBar';
import PopularMenuSection from '../PopularItemSections/PopularMenuSection';
import PopularMenuSectionV2 from '../PopularItemSectionsV2/PopularMenuSectionV2';
import AllCategoriesPage from '../categories/AllCategoriesPage';
import AllCategoriesPageV2 from '../categoriesV2/AllCategoriesPageV2';
import { categories, categoriesV2 } from '../data/categories';
import { popularItems, popularItemsV2 } from '../data/categories';

export default function SearchableMenuSection ({ prop, states, actions , styles }) {

  const { query,setQuery } = states ?? {}

  const lowercasedTerm = query.toLowerCase();
  const filteredPopularItems = popularItems.filter(item =>
    item.name.toLowerCase().includes(lowercasedTerm)
  );

  const filteredPopularItemsV2 = popularItemsV2.filter(item =>
    item.name.toLowerCase().includes(lowercasedTerm)
  );

  const filteredCategories = categories
    .map((category) => {
      const matchedItems = category.items.filter((item) =>
        item.name.toLowerCase().includes(lowercasedTerm)
      );
      return matchedItems.length ? { ...category, items: matchedItems } : null;
    })
    .filter(Boolean);

  const filteredCategoriesV2 = categoriesV2
    .map((category) => {
      const matchedItems = category.items.filter((item) =>
        item.name.toLowerCase().includes(lowercasedTerm)
      );
      return matchedItems.length ? { ...category, items: matchedItems } : null;
    })
    .filter(Boolean);


  const noResults = filteredPopularItems.length === 0 && filteredCategories.length === 0;

  return (
    <Container style={{ marginTop: '30px' }}>
      <Box mt={4}>
        <SearchBar query={query} setQuery={setQuery} />

        {noResults ? (
          <Typography variant="h5" align="center" mt={6} color="text.secondary">
            No items found matching your search.
          </Typography>
        ) : (
          <>
            <PopularMenuSection items={filteredPopularItems}  states={states} prop={prop} actions={actions} />
            <PopularMenuSectionV2 items={filteredPopularItemsV2}  states={states} prop={prop} actions={actions} />
            <AllCategoriesPage categories={filteredCategories} states={states} prop={prop} actions={actions}/>
            <AllCategoriesPageV2 categories={filteredCategoriesV2} states={states} prop={prop} actions={actions}/>
          </>
        )}
      </Box>
    </Container>
  );
};
