import styles from 'styled-components'
import { Link } from 'react-router-dom'

export const CategoryPreviewContainer = styles.div`

 display: flex;
    flex-direction: column;
    margin-bottom: 30px;

    
`

export const Title = styles(Link)`
    font-size: 28px;
    margin-bottom: 25px;
    cursor: pointer;
`


export const Preview = styles.div`
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        column-gap: 20px;
   
`
