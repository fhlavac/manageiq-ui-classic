import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from './main-menu';
import { menuProps, RecursiveMenuProps } from './recursive-props';
import { getHrefByType } from './helpers';

const TopLevel = ({
  level,
  id,
  title,
  iconClass,
  href,
  active,
  items,
  type,
}) => {
  const [topLevelHover, setTopLevelHover] = useState(false);
  console.log('foo')
  return (
    <li className={`${active ? 'active' : ''} list-group-item secondary-nav-item-pf`} data-target={`#menu-${id}`}>
      <a
        href={getHrefByType(type, href, id)}
        onMouseDown={() => {
          window.miqCheckForChanges();
          return type === 'modal' && sendDataWithRx({ type: 'showAboutModal' });
        }}
        target={type === 'new_window' ? '_blank' : '_self'}
      >
        <span className={iconClass} />
        <span className="list-group-item-value">{title}</span>
      </a>
      {items.length > 0 && (
      <React.Fragment>
        <div className="nav-pf-secondary-nav" onClick={console.log} onMouseEnter={() => console.log('foo')} id={`menu-${id}`}>
          <div className="nav-item-pf-header" onClick={console.log} onMouseEnter={() => console.log('foo')}>
            <a className="secondary-collapse-toggle-pf" data-toggle="collapse-secondary-nav"  onClick={console.log} onMouseEnter={() => console.log('foo')}/>
            <span>{title}</span>
          </div>
          <ul className="list-group">
            {items.map(props => <MenuItem key={props.id} level={level + 1} {...props} />)}
          </ul>
        </div>
      </React.Fragment>
      )}
    </li>
  )
 ;};

TopLevel.propTypes = {
  ...menuProps,
  items: PropTypes.arrayOf(PropTypes.shape({
    ...menuProps,
    items: PropTypes.arrayOf(PropTypes.shape(RecursiveMenuProps())),
  })),
};

TopLevel.defaultProps = {
  items: [],
};

export default TopLevel;
