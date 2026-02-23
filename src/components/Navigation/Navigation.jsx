import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem, Typography, Box, Divider, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { indigo } from "@mui/material/colors";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../State/Auth/Action";
import { getNavigation } from "../../State/Category/Action";
import AuthModel from "../../Auth/AuthModel";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const auth = useSelector((store) => store.auth);
  const { categories, logo } = useSelector((store) => store.category);
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    dispatch(getNavigation());
    if (jwt) dispatch(getUser());
  }, [jwt, dispatch]);

  const handleUserClick = (event) => setAnchorEl(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
    localStorage.clear();
    navigate("/");
  };

  const handleCategoryClick = (top, sub, item, close) => {
    // Database wala slug hi use hoga
    const topSlug = top?.slug;
    const subSlug = sub?.slug;
    const itemSlug = item?.slug;

    navigate(`/${topSlug}/${subSlug}/${itemSlug}`);

    if (open) setOpen(false);
    if (close) close();
  };
  return (
    <div className="bg-white">
      {/* ===================== MOBILE MENU (SIDE DRAWER) ===================== */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[100] lg:hidden" onClose={setOpen}>
          <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5 justify-end">
                  <button type="button" className="p-2 text-slate-500" onClick={() => setOpen(false)}>
                    <XMarkIcon className="h-7 w-7" />
                  </button>
                </div>

                {/* Vertical Accordion Menu for Categories */}
                <div className="mt-2">
                  {Array.isArray(categories) && categories.map((category) => (
                    <Accordion
                      key={category.id}
                      disableGutters
                      elevation={0}
                      square
                      sx={{
                        '&:before': { display: 'none' },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel-${category.id}-content`}
                        id={`panel-${category.id}-header`}
                        sx={{
                          backgroundColor: 'rgba(0, 0, 0, .03)',
                          borderBottom: '1px solid rgba(0, 0, 0, .125)',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, .05)',
                          }
                        }}
                      >
                        <Typography sx={{ fontWeight: '500', letterSpacing: '0.5px' }}>{category.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ py: 2, px: 3, backgroundColor: '#fff' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          {category.sections?.map((sub) => (
                            <div key={sub.id}>
                              <p className="font-semibold text-gray-800 text-sm mb-3">{sub.name}</p>
                              <ul className="space-y-2">
                                {sub.items?.map((item) => (
                                  <li key={item.id} className="flow-root">
                                    <p
                                      onClick={() => handleCategoryClick(category, sub, item, () => setOpen(false))}
                                      className="text-gray-600 text-sm cursor-pointer hover:text-indigo-600 hover:translate-x-1 transition-transform duration-200"
                                    >
                                      - {item.name}
                                    </p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <Link to="/services" className="-m-2 block p-2 font-medium text-gray-900">Services</Link>
                  </div>
                  <div className="flow-root">
                    <Link to="/portfolio" className="-m-2 block p-2 font-medium text-gray-900">Portfolio</Link>
                  </div>
                  <div className="flow-root">
                    <Link to="/contact" className="-m-2 block p-2 font-medium text-gray-900">Contact</Link>
                  </div>
                </div>

                {auth.user && (
                  <div className="border-t border-gray-200 px-4 py-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar sx={{ bgcolor: '#248041', width: 32, height: 32 }}>
                        {auth.user.firstName[0].toUpperCase()}
                      </Avatar>
                      <span className="font-medium text-gray-900">
                        {auth.user.firstName}
                      </span>
                    </div>
                    <div className="space-y-6">
                      <div className="flow-root">
                        <p
                          onClick={() => { navigate("/account/order"); setOpen(false); }}
                          className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                        >
                          My Orders
                        </p>
                      </div>
                      <div className="flow-root">
                        <p
                          onClick={() => { handleLogout(); setOpen(false); }}
                          className="-m-2 block p-2 font-medium text-red-600 cursor-pointer"
                        >
                          Logout
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!auth.user && (
                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    <div className="flow-root">
                      <Button
                        onClick={() => {
                          setOpenAuthModal(true);
                          setOpen(false); // Close the mobile menu
                        }}
                        variant="contained"
                        sx={{
                          width: '100%',
                          backgroundColor: '#248041',
                          '&:hover': {
                            backgroundColor: '#34d399',
                          },
                        }}
                      >
                        Sign in
                      </Button>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* ===================== DESKTOP NAVIGATION ===================== */}
      <header className="relative z-50">
        <nav aria-label="Top" className="mx-auto border-b border-gray-100">

          {/* 1. TOP PROMO BAR */}
          <div className="bg-[#248041] py-2">
            <p className="text-center text-xs font-medium text-white uppercase tracking-widest">
              Welcome To Haq Surgical Instruments
            </p>
          </div>

          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-24 items-center justify-between">

              {/* 2. LEFT SECTION: LOGO */}
              <div className="flex items-center">
                <button type="button" className="lg:hidden p-2 text-slate-600" onClick={() => setOpen(true)}>
                  <Bars3Icon className="h-8 w-8" />
                </button>
                <div className="ml-4 lg:ml-0 flex-shrink-0">
                  <Link to="/">
                    <img src={logo || "/logo.png"} alt="Logo" className="h-22 w-auto object-contain" />
                  </Link>
                </div>
              </div>

              {/* 3. CENTER SECTION: NAV LINKS (With Animated Underline) */}
              <div className="hidden lg:flex lg:h-full lg:items-center">
                <div className="flex h-full space-x-10">

                  {/* Home */}
                  <Link to="/" className="group relative flex items-center text-base  text-slate-700 hover:text-[#248041] transition-colors uppercase">
                    Home
                    <span className="absolute bottom-6 left-0 w-0 h-0.5 bg-[#248041] transition-all duration-300 group-hover:w-full"></span>
                  </Link>

                  {/* Dynamic Categories */}
                  {Array.isArray(categories) && categories.map((category) => (
                    <div key={category.id} className="group flex h-full">
                      <button className="relative z-10 flex items-center text-base text-slate-700 transition-colors duration-200 group-hover:text-[#248041] uppercase">
                        {category.name}
                        <span className="absolute bottom-6 left-0 w-0 h-0.5 bg-[#248041] transition-all duration-300 group-hover:w-full"></span>
                      </button>

                      {/* Mega Menu */}
                      <div className="absolute inset-x-0 top-full hidden group-hover:block transition-all duration-300">
                        <div className="bg-white shadow-2xl border-t border-gray-100">
                          <div className="mx-auto max-w-[95vw] px-10 py-12">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-12">

                              {/* Sections (Links) */}
                              <div className={`${category.featured?.length > 0 ? "lg:col-span-8" : "lg:col-span-12"} grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:gap-x-16 gap-x-8 gap-y-10`}>
                                {category.sections?.map((sub) => (
                                  <div key={sub.id} className="min-w-[150px]">
                                    <p className="text-xl font-medium text-gray-800 mb-6 border-b border-gray-200 pb-3 whitespace-nowrap">{sub.name}</p>
                                    <ul className="space-y-4 text-[15px]">
                                      {sub.items?.map((item) => (
                                        <li key={item.id} className="flex">
                                          <p onClick={() => handleCategoryClick(category, sub, item)} className="cursor-pointer text-gray-600 hover:text-[#248041] transition-all hover:translate-x-1">{item.name}</p>

                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>

                              {/* Banners */}
                              {category.featured?.length > 0 && (
                                <div className="lg:col-span-4 grid grid-cols-1 gap-y-8 lg:border-l lg:border-gray-100 lg:pl-10">
                                  {category.featured.map((f, i) => (
                                    <div key={i} className="group/item relative max-w-[350px]">
                                      <div className="overflow-hidden rounded-2xl bg-gray-50 shadow-lg border border-gray-100 w-full h-44">
                                        <img src={f.image} alt={f.title} className="w-full h-full object-fill transition-transform duration-700 group-hover/item:scale-110" />
                                      </div>
                                      <p className="mt-4 font-bold text-gray-900 tracking-tight text-sm">{f.title}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Link to="/services" className="group relative flex items-center text-base text-slate-700 hover:text-[#248041] transition-colors uppercase">
                    Services
                    <span className="absolute bottom-6 left-0 w-0 h-0.5 bg-[#248041] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <Link to="/portfolio" className="group relative flex items-center text-base text-slate-700 hover:text-[#248041] transition-colors uppercase">
                    Portfolio
                    <span className="absolute bottom-6 left-0 w-0 h-0.5 bg-[#248041] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  {/* Contact */}
                  <Link to="/contact" className="group relative flex items-center text-base text-slate-700 hover:text-[#248041] transition-colors uppercase">
                    Contact
                    <span className="absolute bottom-6 left-0 w-0 h-0.5 bg-[#248041] transition-all duration-300 group-hover:w-full"></span>
                  </Link>

                </div>
              </div>

              {/* 4. RIGHT SECTION: ACCOUNT & CART */}
              <div className="flex items-center space-x-8">
                <div className="hidden lg:flex lg:items-center">
                  {auth.user ? (
                    <div className="group relative flex items-center h-full py-2">
                      <Avatar onClick={handleUserClick} sx={{ bgcolor: '#248041', cursor: "pointer", width: 40, height: 40 }}>
                        {auth.user.firstName[0].toUpperCase()}
                      </Avatar>
                      <Menu anchorEl={anchorEl} open={openUserMenu} onClose={handleCloseUserMenu} disableScrollLock={true}>
                        <MenuItem onClick={() => { navigate("/account/order"); handleCloseUserMenu() }}>My Orders</MenuItem>
                        <MenuItem onClick={handleLogout} sx={{ color: 'red' }}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <div className="group relative">
                      <Button
                        onClick={() => setOpenAuthModal(true)}
                        variant="contained"
                        sx={{ backgroundColor: '#248041', '&:hover': { backgroundColor: '#1b6332' }, borderRadius: '12px', px: 4, py: 1.5 }}
                        className="font-bold text-base capitalize shadow-lg"
                      >
                        Sign in
                      </Button>
                    </div>
                  )}
                </div>

                <Divider orientation="vertical" flexItem sx={{ height: 24, my: 'auto' }} className="hidden lg:block" />

                {/* Cart Icon */}
                <div className="flow-root">
                  <button onClick={() => navigate("/cart")} className="group relative flex items-center p-2 outline-none">
                    <ShoppingBagIcon className="h-8 w-8 flex-shrink-0 text-gray-400 group-hover:text-[#248041] transition-colors" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </nav>
      </header>

      <AuthModel open={openAuthModal} handleClose={() => setOpenAuthModal(false)} />
    </div>
  );
}