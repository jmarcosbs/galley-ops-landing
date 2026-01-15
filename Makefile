.PHONY: install clean build preview deploy nginx-test nginx-reload nginx-enable nginx-disable

# Automatiza o build estático do Astro e alguns passos básicos de Nginx
SHELL := /bin/bash

ASTRO_DIR ?= $(CURDIR)
DIST_DIR := $(ASTRO_DIR)/dist
NPM ?= npm
SUDO ?= sudo

SITE_DOMAIN ?= example.galleyops.com
NGINX_ROOT ?= /var/www/$(SITE_DOMAIN)
NGINX_CONF ?= /etc/nginx/sites-available/$(SITE_DOMAIN).conf
NGINX_SITE ?= /etc/nginx/sites-enabled/$(SITE_DOMAIN).conf

install:
	cd $(ASTRO_DIR) && $(NPM) install

clean:
	rm -rf $(DIST_DIR)

build: install
	cd $(ASTRO_DIR) && NODE_ENV=production $(NPM) run build

preview:
	cd $(ASTRO_DIR) && $(NPM) run preview

deploy: build
	$(SUDO) mkdir -p $(NGINX_ROOT)
	$(SUDO) rsync -av --delete $(DIST_DIR)/ $(NGINX_ROOT)/

nginx-test:
	$(SUDO) nginx -t

nginx-reload: nginx-test
	$(SUDO) systemctl reload nginx

nginx-enable:
	$(SUDO) ln -sf $(NGINX_CONF) $(NGINX_SITE)
	$(SUDO) systemctl restart nginx

nginx-disable:
	$(SUDO) rm -f $(NGINX_SITE)
	$(SUDO) systemctl reload nginx
