# Service
## Location for service file
```
cd /etc/systemd/system
```

## Changed service, update the daemon
```
systemctl daemon-reload   
```
## Enable, run this first
```
systemctl enable pixelpi.service
```

```
systemctl start poll.service
systemctl stop poll.service
```
