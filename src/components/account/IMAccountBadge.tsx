import React from "react";
import { Dropdown } from "react-bootstrap";
import styles from "./AccountBadge.module.scss";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/reducers/auth";

interface BadgeToggleProps {
  onClick?: React.MouseEventHandler;
  userName: string;
  userImage: string;
}

const AccountBadgeToggle = React.forwardRef<HTMLDivElement, BadgeToggleProps>(
  ({ onClick, userName, userImage }, ref) => (
    <div
      className={styles.wrap}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
      }}
    >
      <div className={styles.name}>{userName}</div>
      <div>
        <img src={userImage} alt="user-thumbnail" width="48" height="48" />
      </div>
    </div>
  )
);

AccountBadgeToggle.displayName = "AccountBadgeToggle";

export function IMAccountBadge(props: BadgeToggleProps) {
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(authActions.logout());

  return (
    <Dropdown>
      <Dropdown.Toggle as={AccountBadgeToggle} {...props}>
        1
      </Dropdown.Toggle>
      <Dropdown.Menu align="end">
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
