---
id: auto-encoder
title: Auto Encoder for image generation
author: Thomas Barras
tags: [AI]
---

[Source](https://github.com/exced/machine-learning-TF/tree/master/AutoEncoder)

# Auto Encoder

Auto Encoder is a simple method to generate data in an unsupervised world.

The idea is to have 2 neural nets :

- **encoder**: extract data information by destructing the image into a latent space
- **decoder**: reconstruct data from information from a latent space

<!--truncate-->

You can perform function minimization on the real data and the decode(encoded) data.
Therefore you will generate an image that looks like a real one.

The idea behind this:
![schema](/img/2017-04-15-autoencoder/schema.jpg)

It is actually the same reasoning as using compression algorithm with loss and compress - decompress an image.

# Results

Results on 10 test images.

The first row represents the real images and the second one represents the generated images.

### 2 layers

Hyper parameters:

- learning_rate: 0.002
- training epochs: 50
- 2 hidden layers
- [784, 256]
- [256, 128]

![schema](/img/2017-04-15-autoencoder/out_2layers.png)

### 3 layers Overfitting

Hyper parameters:

- learning_rate: 0.002
- training epochs: 50
- 3 hidden layers
- [784, 512]
- [512, 256]
- [256, 128]

![schema](/img/2017-04-15-autoencoder/out_overfit.png)

### 3 layers dropout + relu

Added dropout to avoid overfitting.

Hyper parameters:

- pkeep : 0.75
- Activation functions :
- Relu for the 2 first hidden layers and sigmoid for the last
- learning_rate : 0.002
- training epochs : 50
- 3 hidden layers
- [784, 512]
- [512, 256]
- [256, 128]

![schema](/img/2017-04-15-autoencoder/out_overfit.png)
