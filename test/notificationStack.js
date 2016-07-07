import { Notification, NotificationStack } from '../src/index';
import mockNotification from './mockNotification';

describe('<NotificationStack />', () => {
  let notifications;

  beforeEach(() => {
    notifications = [
      mockNotification,
      Object.assign({}, mockNotification, { key: 2222 })
    ];
  });

  it('onDismiss fires after `dismissAfter` value + transition time', done => {
    const handleDismiss = spy();

    const wrapper = mount(
      <NotificationStack
        notifications={notifications}
        onDismiss={handleDismiss}
      />
    );

    wrapper.update();
    setTimeout(() => {
      try {
        expect(handleDismiss.calledOnce).to.equal(true);
        done();
      } catch (e) {
        done(e);
      }
      // Add time due to each StackedNotification transition time ( > 300 )
    }, mockNotification.dismissAfter + 340);
  });

  it('onDismiss fires on each Notification in the stack', done => {
    const handleDismiss = spy();

    const wrapper = mount(
      <NotificationStack
        notifications={notifications}
        onDismiss={handleDismiss}
      />
    );

    wrapper.update();
    setTimeout(() => {
      try {
        expect(handleDismiss.callCount).to.equal(notifications.length);
        done();
      } catch (e) {
        done(e);
      }
      // Add transition time + 1000ms per each Notification
    }, mockNotification.dismissAfter + 1340);
  });

  it('onDismiss does not fire until `dismissAfter` value times out', () => {
    const handleDismiss = spy();

    const wrapper = shallow(
      <NotificationStack
        notifications={[mockNotification]}
        onDismiss={handleDismiss}
      />
    );

    expect(handleDismiss.calledOnce).to.equal(false);
  });

  it('barStyle factory should set correct style on notification', () => {
    const styleFactory = (index, style) => Object.assign(
      {},
      style,
      { bottom: `${index}px` }
    );
    const stack = mount(
      <NotificationStack
        notifications={[mockNotification]}
        barStyle={styleFactory}
        onDismiss={() => {}}
      />
    );
    const notification = stack.find(Notification);
    expect(notification.prop('barStyle').bottom).to.equal('0px');
  });

  it('barStyle factory should respect notification barStyle', () => {
    const styleFactory = (index, style) => Object.assign(
      {},
      style,
      { bottom: `${index}px` }
    );
    const stack = mount(
      <NotificationStack
        notifications={[mockNotification]}
        barStyle={styleFactory}
        onDismiss={() => {}}
      />
    );
    const notification = stack.find(Notification);
    expect(notification.prop('barStyle').background).to.equal('rgb(2, 2, 2)');
  });

  it('actionBarStyle factory should set correct style on notification', () => {
    const styleFactory = (index, style) => Object.assign(
      {},
      style,
      { bottom: `${index + 2}px` }
    );
    const stack = mount(
      <NotificationStack
        notifications={[mockNotification]}
        activeBarStyle={styleFactory}
        onDismiss={() => {}}
      />
    );
    const notification = stack.find(Notification);
    expect(notification.prop('activeBarStyle').bottom).to.equal('2px');
  });

  it('actionBarStyle factory should respect notification actionBarStyle', () => {
    const styleFactory = (index, style) => Object.assign(
      {},
      style,
      { bottom: `${index}px` }
    );
    const stack = mount(
      <NotificationStack
        notifications={[mockNotification]}
        activeBarStyle={styleFactory}
        onDismiss={() => {}}
      />
    );
    const notification = stack.find(Notification);
    expect(notification.prop('activeBarStyle').left).to.equal('4rem');
  })
});
