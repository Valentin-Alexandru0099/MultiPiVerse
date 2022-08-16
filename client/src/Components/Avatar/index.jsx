import { getAvatar } from '../../ImageVariables';
import './index.css';

export default function Avatar(props) {
    const avatar = getAvatar(props.avatar);
    return (
        <>
            <section className="avatar" >
                <div id='avatar-frame-section'>
                    <img width={props.width} src={avatar} alt='avatar' />
                </div>
            </section>
        </>
    );
};