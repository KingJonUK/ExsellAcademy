# Extra system packages on top of the nodejs-22 module.
# OpenSSL is required by Prisma's query engine.
{ pkgs }: {
  deps = [
    pkgs.openssl
  ];
}
