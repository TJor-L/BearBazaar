import fakeItems from "./fakeitems";
const fakeItemsMap = fakeItems.map(item => ({
    itemID: item.itemID,
    imageURL: item.imageURL,
    itemName: item.itemName,
    estimatedPrice: item.estimatedPrice,
    owner: {
        userId: '508764',
        username: 'Dijkstra'
    },
    category: item.categories,
    description: `This is a sample description for ${item.itemName}. It provides details about the product such as its features, benefits, and other relevant information.`,
    isFavorited: true  // 默认所有商品都被标记为收藏
}));

export default fakeItemsMap
