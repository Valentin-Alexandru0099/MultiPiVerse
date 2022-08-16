import c from "../../images/avatar-images/con10.png"
import './index.css';

export default function Avatar(props) {
    return (
        <>
            <section className="avatar" >
                <div id='avatar-frame-section'>
                    <img width={props.width} src={c} alt='avatar' />
                </div>
            </section>
        </>
    );
};