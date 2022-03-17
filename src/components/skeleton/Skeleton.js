import Skeleton from "react-loading-skeleton";
import {Grid} from "@material-ui/core";
import SkeletonStyle from "./SkeletonStyle";

const Skeletons = (props) => {
    const classes = SkeletonStyle();
    return (
        <section>
            <Grid container className={props.list}>
                {Array(props.nbItem)
                    .fill()
                    .map((item, index) => (
                        <Grid xs={12} className={classes.listCard} key={index}>
                            <h4 className="card-title">
                                <Skeleton height={45} width={"100%"} className={classes.skeleton} />
                            </h4>
                        </Grid>
                    ))}
            </Grid>
        </section>
    );
};

export default Skeletons;
