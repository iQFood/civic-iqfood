import MissingImg from "../media/MissingImg.svg";

export default function MissingImgItem({img}){
    return(
        <>
            {img ? <img src={img} id='product-page-image' /> : <img src={MissingImg} style={{filter:`invert(.9)`}}/>}
        </>
    )
}