import {makeStyles} from "@material-ui/core";
import themeGeneale from '../theme'

const SkeletonStyle = makeStyles((theme)=>({
    list:{
        display:"block",
    },
    listCard:{
        margin:themeGeneale.spacing(1)
    },
}))
export default SkeletonStyle;
