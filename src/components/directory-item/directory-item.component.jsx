import { useNavigate } from 'react-router-dom';
import { BackgroundImage, Body, DirectoryitemContainer} from './directory-item.styles'



const DirectoryItem = ({category}) =>{
    const { imageUrl, title, route} = category;
    const navigate = useNavigate()

    const navigateHandler = () => navigate(route)
return (
  <DirectoryitemContainer onClick={navigateHandler}>
    <BackgroundImage imageUrl={imageUrl} />
    <Body>
      <h2>{title}</h2>
      <p>Shop now</p>
    </Body>
  </DirectoryitemContainer>
);
}
export default DirectoryItem;