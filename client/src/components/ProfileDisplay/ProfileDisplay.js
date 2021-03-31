import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function ProfileDisplay() {
  const { user, user: {name, picture, sub, email,locale } } = useAuth0();
  const dtStyles = {
    fontWeight: 'bold',
  };
  const ddStyles = {
    marginLeft: 0,
    marginBottom: '15px',
  };

  return (
    <div>
      <h2>{name}</h2>
      <img src={picture} alt={name} />
      <dl>
        <dt style={dtStyles}>Email</dt><dd style={ddStyles}>{email}</dd>
        <dt style={dtStyles}>sub (unique id)</dt><dd style={ddStyles}>{sub}</dd>
        <dt style={dtStyles}>Locale</dt><dd style={ddStyles}>{locale}</dd>
        <dt style={dtStyles}>Roles</dt><dd style={ddStyles}>{user[`${window.location.origin}/roles`].join()}</dd>
        <dt style={dtStyles}>Permissions</dt><dd style={ddStyles}>
        <ul style={{listStyle: 'none', padding: 0}}>{user[`${window.location.origin}/user_authorization`].permissions.map(perm => (<li>{perm}</li>))}</ul></dd>
      </dl>
    </div>
  )
}

export default ProfileDisplay
