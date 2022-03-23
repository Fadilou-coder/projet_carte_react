import {Grid} from "@material-ui/core";
import SkeletonStyle from "./SkeletonStyle";
import Skeleton from '@material-ui/lab/Skeleton';

const Skeletons = (props) => {
    const classes = SkeletonStyle();
    return (
        <section>
            <Grid container className={props.list}>
                {Array(10)
                    .fill('')
                    .map((item, index) => (
                        <Grid xs={12} className={classes.listCard} key={index}>
                            <h4 className="card-title">
                                <Skeleton/>
                            </h4>
                        </Grid>
                    ))}
            </Grid>
        </section>
    );
};

export default Skeletons;
