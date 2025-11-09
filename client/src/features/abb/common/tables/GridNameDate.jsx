import React from 'react';
import { FormatDate } from 'react-globalize';

import { dateFormatter, msgFormatter } from 'app/util';
import UserInfo from 'empower-components/UserInfo';

const GridNameDate = ({ children, hideDate = false, type }) => {
  const userData = () => {
    if (!children || !type) return null;
    const {
      CreatedBySSO,
      CreatedDate,
      CreatedEmail,
      CreatedName,
      CreatedUser,
      ModifiedBySSO,
      ModifiedDate,
      ModifiedEmail,
      ModifiedUser,
    } = children;
    switch (type) {
      case 'createdInfo': {
        return {
          date: dateFormatter(CreatedDate),
          email: CreatedEmail,
          name: CreatedUser || CreatedName,
          username: CreatedBySSO,
        };
      }
      case 'modifiedInfo': {
        return {
          date: dateFormatter(ModifiedDate),
          email: ModifiedEmail,
          name: ModifiedUser,
          username: ModifiedBySSO,
        };
      }
      default: {
        return null;
      }
    }
  };

  const user = userData();

  return user ? (
    <UserInfo
      emailAddress={user.email}
      emailAddressLabel={msgFormatter('emailAddress')()}
      name={user.name}
      nameLabel={msgFormatter('name')()}
      username={user.username}
      usernameLabel={msgFormatter('userInfoName')()}
    >
      <div>
        <div>{user.name}</div>
        {hideDate ? '' : <FormatDate>{new Date(user.date)}</FormatDate>}
      </div>
    </UserInfo>
  ) : null;
};

export default GridNameDate;
