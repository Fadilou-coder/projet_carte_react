import { useRef } from "react";
import logosonatel from "../../assets/images/logoSA.png"
import React from 'react'
import { exportComponentAsPNG } from "react-component-export-image";



var QRCode = require('qrcode.react')



export const qrCode = () => {

    const componentRef = useRef();

    const datenow = new Date();


    const [values, setValues] = React.useState({
        Cni: '',
        prenom: '',
        nom: '',
        numTelephone: '',

    })

    function generateQrCode(values) {
        exportComponentAsPNG(componentRef, {
            html2CanvasOptions: {
              onclone: (clonedDoc) => {
                clonedDoc.getElementById("qrCode").style.visibility = "visible";
                // Visibility set to visible using `onclone` method
              },
            },
          })
    }

    return (
        <div ref={componentRef} style={{maxWidth: '400px', maxheight: '400px'}}>
                
                        <QRCode
                            id="qrCode" style={{visibility: "visible" }}
                            value={'{cni:' +  values.Cni + ', temps: ' + datenow.toUTCString() + '}'}
                            size={400}
                            bgColor={"#ffffff"}
                            fgColor={"#138A8A"}
                            level={"H"}
                            includeMargin={false}
                            renderAs={"svg"}
                            imageSettings={{
                                            src: `${logosonatel}`,
                                            x: null,
                                            y: null,
                                            height: 30,
                                            width: 30,
                                            excavate: false,
                            }}
                        />
                    </div>
    );
}

export default qrCode();
