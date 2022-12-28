import { ChevronRight, Home } from "react-feather";

export default function Breadcrumb() {
  return (
    <nav className="flex px-5 py-3 bg-gray-50 py-3 px-5 dark:bg-gray-900 mb-4">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a
            href="#"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <Home size={15} />
            <span className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">
              Home
            </span>
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight size={15} />
            <a
              href="#"
              className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
            >
              Templates
            </a>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <ChevronRight size={15} />
            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
              Flowbite
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
}
