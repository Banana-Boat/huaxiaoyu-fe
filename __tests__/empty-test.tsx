/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Empty from '~components/empty';
import {NativeBaseProvider} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';

it('renders correctly', () => {
  renderer.create(
    <NativeBaseProvider>
      <SafeAreaProvider>
        <Empty />
      </SafeAreaProvider>
    </NativeBaseProvider>,
  );
});
