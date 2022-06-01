import {
  Category,
  Container,
  Footer,
  Header,
  Icon,
  Name,
  Separator,
  Title
} from './styles';

import Button from '../../components/Form/Button';
import { FlatList } from 'react-native';
import React from 'react';
import { categories } from '../../utils/categories';

interface Category {
  key: string,
  name: string
}

interface CategorySelectProps {
  category: Category,
  setCategory: (category: Category) => void,
  closeSelectCategory: () => void
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  category,
  setCategory,
  closeSelectCategory
}) => {
  const handleSelect = (item: Category) => {
    setCategory({
      key: item.key,
      name: item.name
    });
  }

  return (
    <Container>
      <Header>
        <Title>Category</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => (
          <Category
            onPress={() => handleSelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
          <Button
            title="Select"
            onPress={closeSelectCategory}
          />
      </Footer>
    </Container>
  );
}

export default CategorySelect;