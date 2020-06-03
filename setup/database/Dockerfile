FROM postgres

# Set to a non-root built-in user `postgres`
USER postgres

COPY --chown=postgres *.sql /docker-entrypoint-initdb.d/

