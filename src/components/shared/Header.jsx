import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
  Menu,
  MenuButton,
} from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment } from "react";
import {
  HiOutlineBell,
  HiOutlineChatAlt,
  HiOutlineSearch,
} from "react-icons/hi";

export default function Header() {
  return (
    <div className="bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200">
      <div className="relative">
        <HiOutlineSearch
          fontSize={28}
          className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3"
        />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none h-10 w-{24rem} border border-gray-300 rounded-sm pl-11 pr-4"
        />
      </div>
      <div className="flex items-center gap-2 mr-2">
        <Popover className="relative">
          {({ open }) => (
            <>
              <PopoverButton
                className={classNames(
                  open && "bg-gray-200",
                  "p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                <HiOutlineChatAlt fontSize={24} />
              </PopoverButton>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel className="absolute right-0 z-10 mt-2.5 w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">
                      Mensajes
                    </strong>
                    <div className="mt-2 py-1 text-sm">
                      Este es el panel de mensajes
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
        <Popover className="relative">
          {({ open }) => (
            <>
              <PopoverButton
                className={classNames(
                  open && "bg-gray-200",
                  "p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                <HiOutlineBell fontSize={24} />
              </PopoverButton>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel className="absolute right-0 z-10 mt-2.5 w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">
                      Notificaciones
                    </strong>
                    <div className="mt-2 py-1 text-sm">
                      Este es el panel de notificaciones
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
        <Menu as="div" className="relative">
          <div>
            <MenuButton className="ml-2 inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
              <span className="sr-only">Open user menu</span>
              <div
                className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                style={{
                  backgroundImage:
                    'url("https://source.unsplash.com/80x80?face")',
                }}
              >
                <span className="sr-only">Hugh Jackman</span>
              </div>
            </MenuButton>
          </div>
        </Menu>
      </div>
    </div>
  );
}
