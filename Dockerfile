FROM rust:alpine3.14 as builder

WORKDIR /app

RUN apk add musl-dev

COPY Cargo.toml Cargo.lock ./
RUN mkdir .cargo

RUN cargo vendor > .cargo/config

COPY ./microtime.rs ./
RUN RUSTFLAGS="-C target-feature=-crt-static" cargo build --release --offline

# # second stage.
# FROM alpine:3.14
# COPY --from=builder /usr/local/cargo/bin/* /usr/local/bin
