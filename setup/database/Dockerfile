FROM postgres

# Set to a non-root built-in user `postgres`
USER postgres

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=postgres *.sql ./

ENV HOST=0.0.0.0 PORT=5432

CMD [ 'psql', '-U', 'postgres', '-a', '-f', './0.pre-DDL.sql']
CMD [ 'psql', '-U', 'postgres', '-a', '-f', './1.DDL_contractusapp.sql']
