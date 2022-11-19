import React from 'react';
import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  // ListItemButton,
  ListItemText,
} from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BarChartIcon from '@mui/icons-material/BarChart';
import EventIcon from '@mui/icons-material/Event';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/contexts/AuthProvider';
import Logo from '../../core/components/Logo';
import { drawerCollapsedWidth, drawerWidth } from '../../core/config/layout';

type AdminDrawerProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  onSettingsToggle: () => void;
};

export const menuItems = [
  {
    icon: HomeIcon,
    key: 'admin.drawer.menu.home',
    path: '/admin',
  },
  {
    icon: BarChartIcon,
    key: 'admin.drawer.menu.dashboard',
    path: '/admin/dashboard',
  },
  {
    icon: BarChartIcon,
    key: 'admin.drawer.menu.productManagement',
    path: '/admin/product-management',
  },
  {
    icon: PeopleIcon,
    key: 'admin.drawer.menu.userManagement',
    path: '/admin/user-management',
  },
  {
    icon: EventIcon,
    key: 'admin.drawer.menu.calendar',
    path: '/admin/calendar',
  },
  {
    icon: AccountTreeIcon,
    key: 'admin.drawer.menu.projects',
    path: '/admin/projects',
  },
  {
    icon: HelpCenterIcon,
    key: 'admin.drawer.menu.help',
    path: '/admin/help',
  },
];

function AdminDrawer({
  collapsed,
  mobileOpen,
  onDrawerToggle,
  onSettingsToggle,
}: AdminDrawerProps) {
  const { userInfo } = useAuth();
  const { t } = useTranslation();

  const width = collapsed ? drawerCollapsedWidth : drawerWidth;

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <Logo sx={{ display: 'flex', p: 4 }} />
      <List component="nav" sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            // activeClassName="Mui-selected"
            className="Mui-listItem-spec"
            end
            key={item.path}
            to={`${process.env.PUBLIC_URL}${item.path}`}
            component={NavLink}
          >
            {/* <ListItemButton /> */}
            <ListItemAvatar>
              <Avatar sx={{ color: 'inherit', bgcolor: 'transparent' }}>
                <item.icon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={t(item.key)}
              sx={{
                display: collapsed ? 'none' : 'block',
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <List component="nav" sx={{ p: 2 }}>
        <ListItem
          button
          component={NavLink}
          to={`${process.env.PUBLIC_URL}/admin/profile`}
        >
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          {userInfo && (
            <ListItemText
              primary={`${userInfo.firstName} ${userInfo.lastName}`}
              sx={{
                display: collapsed ? 'none' : 'block',
              }}
            />
          )}
        </ListItem>
        <ListItem button onClick={onSettingsToggle}>
          <ListItemAvatar>
            <Avatar>
              <SettingsIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={t('admin.drawer.menu.settings')}
            sx={{
              display: collapsed ? 'none' : 'block',
            }}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      aria-label="Admin drawer"
      component="nav"
      sx={{
        width: { lg: width },
        flexShrink: { lg: 0 },
      }}
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default AdminDrawer;
