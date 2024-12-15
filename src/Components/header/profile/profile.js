import {IconChevron} from "../../shared/icons/icon-chevron";
import {IconProfile} from "../../shared/icons/icon-profile";
import css from './profile.module.scss'
import {useState} from "react";

export const Profile = () => {
    const [isOpen, setIsMenuShown] = useState(false);

    return (
        <div className={css.profile}
             onClick={() => setIsMenuShown(!isOpen)}>
            <div className={css.profile__logo}><IconProfile/></div>
            <div className={`${css.chevron} ${isOpen ? css.up : ''}`}>
                <IconChevron/>
            </div>

            {isOpen && <div className={css.menu}>
                <div className={css.menu_item}>Profile</div>
                <div className={css.menu_item}>Log Out</div>
            </div>
            }
        </div>
    )
}