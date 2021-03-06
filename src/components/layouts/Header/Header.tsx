import React, {useState, useRef} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import PaletteIcon from '@material-ui/icons/Palette';
import {useTheme} from '@material-ui/core/styles';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Skeleton from '@material-ui/lab/Skeleton';
import {useSelector, shallowEqual} from 'react-redux';

import {useStyles} from './HeaderStyle';
import {RootState} from '@store/types';
import UserAvatar from '@components/common/avatars/UserAvatar';
import {userLink} from '@utils/users';
import {SearchFocus} from '@utils/hotKeys';
import ZoomTooltip from '@components/common/tooltips/ZoomTooltip';
import SignInButton from '@components/common/SignInButton';
import SearchResult from './SearchResult';
import useDebounce from '@utils/hooks/useDebounce';
import {useAuthModal} from '@utils/hooks';

type Props = {
	openDrawer: () => void;
	openThemePickerModal: () => void;
	openHotKeysModal: () => void;
	openSettingsModal: () => void;
	exit: () => void;
};

const Header: React.FC<Props> = ({
	openDrawer,
	openThemePickerModal,
	openHotKeysModal,
	openSettingsModal,
	exit,
}) => {
	const classes = useStyles();
	const theme = useTheme();

	const title = process.env.REACT_APP_TITLE;

	const [searchQuery, setSearchQuery] = useState('');
	const [showSearchResult, setShowSearchResult] = useState(false);
	const debouncedSearchQuery = useDebounce(searchQuery, 600);

	const {openAuthModal} = useAuthModal();

	const searchRef = useRef<HTMLInputElement>(null);
	const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<HTMLButtonElement | null>(null);

	const auth = useSelector((state: RootState) => state.auth, shallowEqual);
	const appLoading = useSelector((state: RootState) => state.app.loading, shallowEqual);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		const value = e.target.value;

		setSearchQuery(value);

		if (value.trim()) {
			setShowSearchResult(true);
		} else {
			setShowSearchResult(false);
		}
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleAppearance = () => {
		handleMenuClose();
		handleMobileMenuClose();

		openThemePickerModal();
	};
	const handleSettings = () => {
		handleMenuClose();
		handleMobileMenuClose();

		openSettingsModal();
	};
	const handleNotification = () => {
		handleMenuClose();
		handleMobileMenuClose();
	};
	const handleSignIn = () => {
		handleMenuClose();
		handleMobileMenuClose();

		openAuthModal();
	};

	const handleProfileMenuOpen = (e: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(e.currentTarget);
	};
	const handleMobileMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
		setMobileMoreAnchorEl(e.currentTarget);
	};

	const handleFoucs = () => {
		if (searchRef.current) {
			searchRef.current.focus();
		}
	};

	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{vertical: 'top', horizontal: 'right'}}
			keepMounted
			transformOrigin={{vertical: 'top', horizontal: 'right'}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			{auth.isAuth ? (
				<div>
					<Link underline='none' component={RouterLink} to={userLink(auth.user)} color={'inherit'}>
						<MenuItem onClick={handleMenuClose}>
							<ListItemIcon>
								<AccountBoxIcon />
							</ListItemIcon>
							<ListItemText primary='My profile' />
						</MenuItem>
					</Link>
					<MenuItem onClick={handleNotification}>
						<ListItemIcon>
							<NotificationsIcon />
						</ListItemIcon>
						<ListItemText primary='Notification' />
					</MenuItem>
					<MenuItem onClick={handleAppearance}>
						<ListItemIcon>
							<PaletteIcon />
						</ListItemIcon>
						<ListItemText primary='Change theme' />
					</MenuItem>
					<MenuItem onClick={handleSettings}>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary='Settings' />
					</MenuItem>
					<MenuItem
						onClick={() => {
							handleMenuClose();
							exit();
						}}
					>
						<ListItemIcon>
							<ExitToAppIcon />
						</ListItemIcon>
						<ListItemText primary='Sign out' />
					</MenuItem>
				</div>
			) : (
				<div>
					<MenuItem onClick={handleSignIn}>
						<ListItemIcon>
							<AccountBoxIcon />
						</ListItemIcon>
						<ListItemText primary='Sign in' />
					</MenuItem>
					<MenuItem onClick={handleAppearance}>
						<ListItemIcon>
							<PaletteIcon />
						</ListItemIcon>
						<ListItemText primary='Change theme' />
					</MenuItem>
					<MenuItem onClick={handleSettings}>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary='Settings' />
					</MenuItem>
				</div>
			)}
		</Menu>
	);

	const renderMenu = auth.user && (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{vertical: 'top', horizontal: 'right'}}
			keepMounted
			transformOrigin={{vertical: 'top', horizontal: 'right'}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<Link underline='none' component={RouterLink} to={userLink(auth.user)} color={'inherit'}>
				<MenuItem onClick={handleMenuClose}>
					<ListItemIcon>
						<AccountBoxIcon />
					</ListItemIcon>
					<ListItemText primary='My account' />
				</MenuItem>
			</Link>

			<MenuItem
				onClick={() => {
					exit();
					handleMenuClose();
				}}
			>
				<ListItemIcon>
					<ExitToAppIcon />
				</ListItemIcon>
				<ListItemText primary='Sign out' />
			</MenuItem>
		</Menu>
	);

	return (
		<header className={classes.root}>
			<div className={classes.grow}>
				<AppBar position='fixed' color={theme.palette.type === 'light' ? 'primary' : 'default'}>
					<Toolbar>
						<IconButton
							edge='start'
							className={classes.menuButton}
							aria-label='Open drawer'
							onClick={openDrawer}
							color='inherit'
							disabled={appLoading}
						>
							<MenuIcon />
						</IconButton>
						<Typography className={classes.title} variant='h5' noWrap>
							<Link underline='none' component={RouterLink} to='/' color={'inherit'}>
								{title}
							</Link>
						</Typography>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder='Search ("/" to focus)'
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								type='search'
								inputRef={searchRef}
								disabled={appLoading}
								value={searchQuery}
								onChange={handleChangeSearch}
								onFocus={() => {
									if (searchQuery) {
										setShowSearchResult(true);
									}
								}}
								// onBlur={() => setShowSearchResult(false)}
							/>

							{showSearchResult && (
								<SearchResult
									searchQuery={debouncedSearchQuery}
									handleLinkClick={() => {
										setSearchQuery('');
										setShowSearchResult(false);
									}}
								/>
							)}
						</div>
						<div className={classes.grow} />
						<div className={classes.sectionDesktop}>
							<div className={classes.rightSide}>
								{appLoading ? (
									<>
										<Skeleton variant='circle' style={{marginLeft: 10}} width={40} height={40} />
										<Skeleton variant='circle' style={{marginLeft: 10}} width={40} height={40} />
										<Skeleton variant='circle' style={{marginLeft: 10}} width={40} height={40} />
										<Skeleton variant='circle' style={{marginLeft: 10}} width={40} height={40} />
									</>
								) : (
									<>
										<ZoomTooltip title='Hot keys'>
											<IconButton onClick={openHotKeysModal} color='inherit'>
												<KeyboardIcon />
											</IconButton>
										</ZoomTooltip>
										<ZoomTooltip title='Change theme'>
											<IconButton onClick={handleAppearance} color='inherit'>
												<PaletteIcon />
											</IconButton>
										</ZoomTooltip>
										<ZoomTooltip title='Settings'>
											<IconButton onClick={openSettingsModal} color='inherit'>
												<SettingsIcon />
											</IconButton>
										</ZoomTooltip>
										{auth.isAuth ? (
											<>
												<ZoomTooltip title='Notification'>
													<IconButton color='inherit'>
														<Badge badgeContent={17} color='secondary'>
															<NotificationsIcon />
														</Badge>
													</IconButton>
												</ZoomTooltip>
												<UserAvatar
													user={auth.user}
													className={classes.avatar}
													onClick={handleProfileMenuOpen}
												/>
											</>
										) : (
											<SignInButton marginLeft={10} />
										)}
									</>
								)}
							</div>
						</div>
						<div className={classes.sectionMobile}>
							<IconButton aria-haspopup='true' onClick={handleMobileMenuOpen} color='inherit'>
								<MoreIcon />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				{renderMobileMenu}
				{renderMenu}
			</div>

			<SearchFocus action={handleFoucs} />
		</header>
	);
};

export default Header;
