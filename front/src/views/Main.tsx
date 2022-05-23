import React, {ReactEventHandler, useContext, useState} from 'react'
import {useStyles} from "../styles";
import {FileUploader} from "../components/FileUploader/FileUploader";
import {Box, Container, Grid, Paper, Slider, Typography} from "@mui/material";
import pic from "../images/windowlicker.jpg"
import ReactCrop, {Crop} from "react-image-crop";
import {useImage, useParameters, useSnack} from "../hooks/useContexts";
import {BaseSnackbar} from "../components/Snackbar/BaseSnackbar";
import {ParametersBox} from "../components/ParametersBox/ParametersBox";
import {Settings, PlayArrow} from "@mui/icons-material";
import {changeSpectogramParameter} from "../servicies/chparameter"
import {MusicList} from "../components/MusicList/MusicList";
import {Image} from "../contexts/ImageContext";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


export function Main () {

    const {parameters} = useParameters()

    const {image, setImage} = useImage();

    const [crop, setCrop] = useState<Crop>({
        unit: '%', // Can be 'px' or '%'
        x: 25,
        y: 25,
        width: 50,
        height: 50
    })

    const classes = useStyles();

    function handleCreateNewSpec() {
        const response =  changeSpectogramParameter(parameters)
            .then( res => {

                const image = {
                    data: "data:image/png;base64," + res.data,
                    imageid: "1"
                }as Image
                console.log(image)

                setImage(image)
            })

    }

    return (
        <React.Fragment>
            <Grid
                className={classes.mainContainer}
                container
                direction="row"
                justifyContent={"space-evenly"}
                xs={12} md={12} lg={12} xl={12}
            >
                <Grid
                    container
                    alignItems="center"
                    direction="column"
                    xs={12} md={12} lg={12} xl={12}
                >
                    <Typography variant="h4" style={{fontWeight: 700, color: "#ccc8c8"}}>
                        Inspectrograma
                    </Typography>
                    <Typography variant="h6" style={{fontWeight: 700, color: "#ccc8c8"}}>
                        - Inspecione suas músicas aqui -
                    </Typography>
                </Grid>
                <Grid
                    container
                    alignItems="top"
                    direction="row"
                    justifyContent={"space-evenly"}
                    xs={12} md={12} lg={12} xl={12}
                >
                    <MusicList />
                    <Paper className={classes.specContainer}>
                        <TransformWrapper>
                            <TransformComponent>
                                <   img src={pic} />
                            </TransformComponent>
                        </TransformWrapper>
                    </Paper>
                    <Grid
                        direction="row"
                        justifyContent={"space-evenly"}
                    >
                        <ParametersBox />
                        <button
                            className={classes.settingButton}
                            onClick={() => {
                                handleCreateNewSpec()
                            }}
                        >
                            <PlayArrow/>                      

                        </button>
                    </Grid>
                </Grid>
                <Grid
                    container
                    alignItems="center"
                    direction="column"
                    xs={12} md={12} lg={12} xl={12}
                >
                    <FileUploader/>

                </Grid>
            </Grid>
            <BaseSnackbar/>
        </React.Fragment>
    );
}
