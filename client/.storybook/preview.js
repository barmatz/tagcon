import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import '../src/index.scss';
import './index.scss';

addDecorator(withInfo);
