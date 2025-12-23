import { useState } from 'react';
import { X, Bell, BookOpen, ArrowRightLeft, Briefcase, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'session' | 'swap' | 'task' | 'reward';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'session',
    title: 'New Session Request',
    message: 'Alice wants to learn Python from you',
    time: '2 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'swap',
    title: 'Skill Swap Approved',
    message: 'Your swap request for Guitar and JavaScript was approved!',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'task',
    title: 'Task Application Accepted',
    message: 'You have been selected for Create React Portfolio',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'reward',
    title: 'Points Earned!',
    message: 'You earned 50 points for completing a session',
    time: '1 day ago',
    read: true,
  },
];

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const getIcon = (type: string) => {
    switch (type) {
      case 'session': return <BookOpen className="w-5 h-5" />;
      case 'swap': return <ArrowRightLeft className="w-5 h-5" />;
      case 'task': return <Briefcase className="w-5 h-5" />;
      case 'reward': return <Gift className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'session': return 'bg-feature-teach/10 text-feature-teach';
      case 'swap': return 'bg-feature-study/10 text-feature-study';
      case 'task': return 'bg-feature-quiz/10 text-feature-quiz';
      case 'reward': return 'bg-accent/10 text-accent';
      default: return 'bg-primary/10 text-primary';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 z-50 w-full max-w-sm h-full bg-card shadow-2xl animate-slide-in-right">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-xl font-bold text-foreground">Notifications</h2>
              {unreadCount > 0 && (
                <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-primary hover:underline"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Bell className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={cn(
                    "p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-soft",
                    notification.read 
                      ? "bg-muted/30 border-border/30" 
                      : "bg-card border-primary/20 shadow-soft"
                  )}
                >
                  <div className="flex gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                      getIconColor(notification.type)
                    )}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={cn(
                          "font-semibold text-sm",
                          notification.read ? "text-muted-foreground" : "text-foreground"
                        )}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;
