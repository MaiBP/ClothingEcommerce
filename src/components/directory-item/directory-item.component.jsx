
import { BackgroundImage, Body, DirectoryitemContainer} from './directory-item.styles'

const DirectoryItem = ({category}) =>{
    const { imageUrl, title} = category;
return (
  <DirectoryitemContainer>
    <BackgroundImage imageUrl={imageUrl} />
    <Body>
      <h2>{title}</h2>
      <p>Shop now</p>
    </Body>
  </DirectoryitemContainer>
);
}
export default DirectoryItem;