#!/usr/bin/ruby

require "time"
require "base64"
require "json"
require "openssl"
require "pp"
require "rest-client"

key = "UVTdQwUYYYivXU1x"
secret = "v4L3FZH32eQNiwpzjXmjejxMBqugla"

p "key: #{key}"
p "secret: #{secret}"

expire_time = (Time.now + 60 * 60).utc.iso8601(3)

p "expire_time: #{expire_time}"

policy = "{\"expiration\": \"#{expire_time}\",\"conditions\": [{ \"bucket\": \"tianche-test\" }]}"
policy = policy.force_encoding(Encoding::UTF_8)

pp "policy: #{policy}"

policy = (Base64.urlsafe_encode64(policy)).strip

pp "base64 encoded policy: #{policy}"

digest = OpenSSL::Digest.new('sha1')
signature = OpenSSL::HMAC.digest(digest, secret, policy)
signature = (Base64.encode64(signature)).strip

p "signature: #{signature}"

begin
  RestClient.proxy = "http://192.168.2.102:8899"
  RestClient.post 'http://tianche-test.oss-cn-hangzhou.aliyuncs.com',
    { OSSAccessKeyId: key,
      policy: policy,
      Signature: signature,
      key: "test#{Time.now.to_i}",
      file: File.new("/Users/darmody/Pictures/GAP.png", 'rb'),
      multipart: true
    }
rescue => e
   puts e.response
end
