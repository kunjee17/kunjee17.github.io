---

title: "Tensorflow with Fable-Elmish. A Failed Try"
slug : "tensorflow-fable-elmish-a-failed-try"

date: 2018-12-17
categories:
- Technical
tags:
- OSS
- FSharp
- Fable
- Functional
- Functional Web
- Dotnetcore
---

I don't know I should be writing this or not. But I am giving it a go. This article is part of [FsAdvent](https://sergeytihon.com/2018/10/22/f-advent-calendar-in-english-2018/) calender.

I wanted to use [Tensorflow JS](https://js.tensorflow.org) with Fable and specifically Fable - Elmish application. But I failed to do so. There are a couple of reasons I have found out. Reader may solve the issue or point out other issues. I am all ears.

Let me explain the setup, I don't want any extra elements in the mix, so I started with bare minimum set up. My t starting point is to taking a small example of Tensorflow JS and convert to [Typescript](https://github.com/kunjee17/TensorTS). It was kind of easy; as Tensorflow library is build using TypeScript.

This one is a good start for me, so the next logical step is to use TS2Fable and convert `index.d.ts` file. But as the old saying goes, good and bad things always come in a pair. The definition file is pointing to different modules file and they also point to other files. So, the TS2Fable utility didn't work out for me, even with its "-e" option.

Next option is to exploit Fable's dynamic support feature and add types as and when required. This seems to be a nicer option. So, I start with this one.

Here I made another mistake. I reviewed a demo/sample application but miss out the details. This Library is very much designed in an object-oriented way and there are few javascript based things also includes like nested callbacks. And in sample application UI is modified from inside of functions. That is one thing and other is heavy use of native javascript types like Float32Array and other types.

```ts
await model.fit(trainData.xs, trainData.labels, {
    batchSize,
    validationSplit,
    epochs: trainEpochs,
    callbacks: {
      onBatchEnd: async (batch, logs) => {
        trainBatchCount++;
        ui.logStatus(
            `Training... (` +
            `${(trainBatchCount / totalNumBatches * 100).toFixed(1)}%` +
            ` complete). To stop training, refresh or close page.`);
        ui.plotLoss(trainBatchCount, logs!.loss, 'train');
        ui.plotAccuracy(trainBatchCount, logs!.acc, 'train');
        if (onIteration && batch % 10 === 0) {
          onIteration('onBatchEnd', batch, logs);
        }
        await tf.nextFrame();
      },
      onEpochEnd: async (epoch, logs) => {
        valAcc = logs!.val_acc;
        ui.plotLoss(trainBatchCount, logs!.val_loss, 'validation');
        ui.plotAccuracy(trainBatchCount, logs!.val_acc, 'validation');
        if (onIteration) {
          onIteration('onEpochEnd', epoch, logs);
        }
        await tf.nextFrame();
      }
    }
  });
```

All the `ui.` is changing UI from callback functions.


Above things can be tackled too.  But, I am a novice user of Tensorflow and still, I tried to use with Elmish.  This makes things more complicated.

Here is [TensorTS (Typescript working project)](https://github.com/kunjee17/TensorTS) and [TensorFable (the project not working.)](https://github.com/kunjee17/tensorfable). I was able to create all the UI skeleton in Elmish way. But when it comes to doing model training part, I just couldn't pull it. Above is the code; There was a need to dispatch message from promise function which itself should be triggered by Cmd.

```fsharp
let train (tfmodel) (onIteration) (model) dispatch =
        promise {
            LogStatus "Training Model" |> dispatch
            // Now that we've defined our model, we will define our optimizer. The
            // optimizer will be used to optimize our model's weight values during
            // training so that we can decrease our training loss and increase our
            // classification accuracy.
            // The learning rate defines the magnitude by which we update our weights each
            // training step. The higher the value, the faster our loss values converge,
            // but also the more likely we are to overshoot optimal parameters
            // when making an update. A learning rate that is too low will take too long
            // to find optimal (or good enough) weight parameters while a learning rate
            // that is too high may overshoot optimal parameters. Learning rate is one of
            // the most important hyperparameters to set correctly. Finding the right
            // value takes practice and is often best found empirically by trying many
            // values.
            let LearningRate = 0.01
            // We are using rmsprop as our optimizer.
            // An optimizer is an iterative method for minimizing an loss function.
            // It tries to find the minimum of our loss function with respect to the
            // model's weight parameters.
            let optimizer = "rmsprop"
            // We compile our model by specifying an optimizer, a loss function, and a
            // list of metrics that we will use for model evaluation. Here we're using a
            // categorical crossentropy loss, the standard choice for a multi-class
            // classification problem like MNIST digits.
            // The categorical crossentropy loss is differentiable and hence makes
            // model training possible. But it is not amenable to easy interpretation
            // by a human. This is why we include a "metric", namely accuracy, which is
            // simply a measure of how many of the examples are classified correctly.
            // This metric is not differentiable and hence cannot be used as the loss
            // function of the model.
            tfmodel?compile (createObj [ "optimizer" ==> optimizer
                                         "loss" ==> "categoricalCrossentropy"
                                         "metrics" ==> [ "accuracy" ] ])
            // Batch size is another important hyperparameter. It defines the number of
            // examples we group together, or batch, between updates to the model's
            // weights during training. A value that is too low will update weights using
            // too few examples and will not generalize well. Larger batch sizes require
            // more memory resources and aren't guaranteed to perform better.
            let batchSize = 320
            // Leave out the last 15% of the training data for validation, to monitor
            // overfitting during training.
            let validationSplit = 0.15
            // Get number of training epochs from the UI.
            let trainEpochs = model.Epochs
            // We'll keep a buffer of loss and accuracy values over time.
            let trainBatchCount = 0
            let trainData = getTrainData()
            let testData = getTestData (None)
            let totalNumBatches =
                Math.ceil
                    (trainData.xs.shape.[0] * (1. - validationSplit)
                     / (float batchSize)) * (float trainEpochs)
            return ()
        }
```

I haven't touched canvas and drawing part at all here. This point I just crashed,  I couldn't get my head around how to do this, I tried a couple of things like using Subscribe, or ping-ponging command. Nothing works out.

Normally all FsAdvent post are telling success stories. Cool things you can do with F#. I also want to add one more story by adding Tensorflow in the club. Sadly I couldn't. I could have written some other success story but I guess failures also have their own importance.

The sample project is open sourced and I love to get feedback, review or some another way to look at a problem. Love to chat over DM for this one. Theoretically, it is possible so it should work. I am definitely coming back to this in a new year.

I am not sure how much Tensorflow is required in Fable world. It is a big library, a serious big library doing too many things. I tried to convert definitions to F# and dependencies just throw me out. So, actually don't know if effort worth in that area. But I personally like to learn more so we can integrate more (large) libraries relatively easily.

Lastly, I am extremely sorry that I couldn't get a good article for FsAdvent readers. Maybe next time.
