import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

// Creating global window configuration
const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target)
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};
global.fetch = jest.fn();
global.cancelAnimationFrame = function(id) {
  clearTimeout(id);
};
copyProps(window, global);

configure({
  adapter: new Adapter(),
  lifecycleExperimental: true,
  disableLifecycleMethods: false
});

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useSSR: jest.fn(),
  useTranslation: jest.fn(() => ({
    t: jest.fn(key => key),
    i18n: { languages: ['es'] }
  })),
  Trans: ({ children }) => children
}));
