import { Outlet, Link} from "react-router-dom";
import { Fragment, useContext } from 'react'
import { ReactComponent as CrwnLog} from '../../assets/crown.svg'
import { useSelector } from "react-redux";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils"
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles';

import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import CartIcon from '../../components/cart-icon/cart-icon.component'

import { CartContext } from "../../contexts/cart.context";
import { selectCurrentUser } from "../../store/user/user.selector";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  // console.log(currentUser)

  const { isCartOpen } = useContext(CartContext)
 
  
 
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLog className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              {" "}
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">
              SIGN IN
            </NavLink>
          )}
          <CartIcon/>
        </NavLinks>
        {isCartOpen && <CartDropdown/>}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;